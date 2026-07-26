# frozen_string_literal: true

require "json"

module DraculaKnowledge
  # Reads theme settings out of _config.yml, applying defaults.
  #
  #   dracula_knowledge:
  #     collection: knowledge   # collection to index
  #     index_path: /assets/search-index.json
  #     excerpts: false         # include a short excerpt per entry (bigger index)
  class Config
    DEFAULTS = {
      "collection" => "knowledge",
      "index_path" => "/assets/search-index.json",
      "excerpts"   => false,
    }.freeze

    def initialize(site)
      @opts = DEFAULTS.merge(site.config["dracula_knowledge"] || {})
    end

    def collection = @opts["collection"]
    def index_path = @opts["index_path"]
    def excerpts?  = @opts["excerpts"] ? true : false
  end

  # Turns a directory or file name into something readable in the menu:
  # "nvim-treesitter" -> "Nvim Treesitter", "01_getting-started" -> "Getting Started".
  def self.humanize(name)
    name
      .sub(/\.(md|markdown|html)\z/i, "")
      .sub(/\A[\d]+[-_.\s]+/, "")
      .tr("_-", "  ")
      .split(/\s+/)
      .reject(&:empty?)
      .map { |w| w =~ /\A[A-Z0-9]{2,}\z/ ? w : w.capitalize }
      .join(" ")
  end

  # Builds the sidebar section list and the client-side search/tree index in a
  # single pass over the collection.
  #
  # This exists as a plugin rather than Liquid because the target corpus is tens
  # of thousands of documents nested up to ~17 levels deep. Grouping that in
  # Liquid costs O(docs) per rendered page; here it is O(docs) for the whole
  # build, and the nested tree is handed to the browser as JSON instead of being
  # re-emitted into every page's HTML.
  class Builder < Jekyll::Generator
    safe true
    priority :normal

    MARKDOWN_EXT = %w[.md .markdown .mdown].freeze

    def generate(site)
      cfg = Config.new(site)
      collection = site.collections[cfg.collection]
      return if collection.nil?

      promote_static_markdown(site, collection)

      docs = collection.docs.reject { |d| d.data["hidden"] }
      prefix = "_#{cfg.collection}/"

      entries = docs.map { |doc| entry_for(doc, prefix, cfg, site) }
      entries.sort_by! { |e| [e["s"].downcase, e["p"].downcase] }

      docs.each { |doc| doc.content = TableSpacing.apply(doc.content) }

      site.data["dk_sections"] = sections_from(entries, site, cfg)
      site.data["dk_total"] = entries.length

      site.pages << IndexFile.new(site, cfg.index_path, entries)
    end

    private

    # Jekyll only treats a collection file as a renderable Document if it opens
    # with YAML front matter; everything else is copied through as a static
    # asset. Notes written outside Jekyll rarely have front matter, so without
    # this the bulk of a real knowledge base would ship as raw .md downloads
    # instead of pages.
    #
    # Re-filing them as Documents lets `defaults` in _config.yml supply the
    # layout, exactly as it would for a file that did carry front matter.
    def promote_static_markdown(site, collection)
      promoted = []
      retired = []

      collection.files.reject! do |static_file|
        next false unless MARKDOWN_EXT.include?(static_file.extname.downcase)

        doc = Jekyll::Document.new(
          static_file.path, site: site, collection: collection
        )
        doc.read
        promoted << doc
        retired << static_file
        true
      end

      return if promoted.empty?

      # Collection#read has already pushed these onto site.static_files, which
      # is what actually gets written out. Dropping them only from
      # collection.files would publish every note twice: once as a page and
      # once as a raw .md download.
      site.static_files -= retired

      collection.docs.concat(promoted)
      collection.docs.sort!
      Jekyll.logger.info "Dracula:", "indexed #{promoted.length} front-matter-less notes"
    end

    # True when the title came from Jekyll's filename fallback rather than the
    # document's own front matter, so overwriting it loses nothing.
    def derived_title?(doc)
      title = doc.data["title"]
      return true if title.nil? || title.to_s.empty?

      slug = doc.data["slug"]
      !slug.nil? && title == Jekyll::Utils.titleize_slug(slug)
    end

    def entry_for(doc, prefix, cfg, site)
      rel = doc.relative_path.sub(/\A#{Regexp.escape(prefix)}/, "")
      segments = rel.split("/")
      # A file sitting at the collection root has no directory to group under.
      section = segments.length > 1 ? segments.first : ""
      subpath = segments.length > 1 ? segments[1..].join("/") : rel

      # Imported notes frequently have no front matter, and Jekyll fills the
      # gap with Utils.titleize_slug, which only splits on hyphens -- so
      # "AUDIO_SYSTEM.md" surfaces as "Audio_system". Replace that derived
      # value (never an author's real title) with something readable.
      doc.data["title"] = DraculaKnowledge.humanize(File.basename(rel)) if derived_title?(doc)
      doc.data["dk_section"] = section

      # Include baseurl so routes work in subdirectories (e.g., github.io/blog/).
      baseurl = (site.config["baseurl"] || "").to_s
      url = baseurl + doc.url

      entry = {
        "t" => doc.data["title"].to_s,
        "u" => url,
        "s" => section,
        "p" => subpath,
      }

      if cfg.excerpts?
        text = doc.content.to_s.gsub(/<[^>]+>/, " ").gsub(/\s+/, " ").strip
        entry["e"] = text[0, 160]
      end

      entry
    end

    def sections_from(entries, site, cfg)
      counts = Hash.new(0)
      entries.each { |e| counts[e["s"]] += 1 }

      base = "#{site.config["baseurl"]}/#{cfg.collection}/"

      counts.keys.sort_by(&:downcase).map do |slug|
        {
          "slug"  => slug,
          # Root-level documents are grouped under a pseudo-section.
          "title" => slug.empty? ? "Ungrouped" : DraculaKnowledge.humanize(slug),
          "count" => counts[slug],
          "url"   => slug.empty? ? base : "#{base}##{Jekyll::Utils.slugify(slug)}",
        }
      end
    end
  end

  # GitHub renders a table that butts directly against the preceding line;
  # kramdown requires a blank line first and silently degrades the whole block
  # into a paragraph of literal pipes. Notes written for GitHub hit this
  # constantly, so restore the blank line before the converter runs.
  module TableSpacing
    TABLE_ROW = %r{\A\s*\|.*\|\s*\z}
    # A delimiter row: | --- | :--: | ---: |
    DELIMITER = %r{\A\s*\|[\s:|-]+\|\s*\z}
    FENCE = %r{\A\s*(```|~~~)}

    def self.apply(content)
      return content unless content.include?("|")

      lines = content.split("\n", -1)
      out = []
      in_fence = false

      lines.each_with_index do |line, i|
        if line.match?(FENCE)
          in_fence = !in_fence
          out << line
          next
        end

        if !in_fence && starts_table?(lines, i) && !out.last.to_s.strip.empty?
          out << ""
        end

        out << line
      end

      out.join("\n")
    end

    # A table starts where a row is followed by a delimiter row.
    def self.starts_table?(lines, i)
      lines[i].match?(TABLE_ROW) &&
        !lines[i].match?(DELIMITER) &&
        lines[i + 1].to_s.match?(DELIMITER)
    end
  end

  # A synthetic page holding the JSON index. Written directly as JSON so the
  # payload never passes through Liquid or the Markdown converter.
  class IndexFile < Jekyll::PageWithoutAFile
    def initialize(site, path, entries)
      dir = File.dirname(path)
      super(site, site.source, dir == "/" ? "" : dir, File.basename(path))

      self.data = { "layout" => nil, "sitemap" => false }
      self.content = JSON.generate("entries" => entries)
      self.output = content
    end

    # Skip Jekyll's renderer entirely; content is already final.
    def render(*) = nil
    def render_with_liquid? = false
  end
end
