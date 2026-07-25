# frozen_string_literal: true

require "json"

module DraculaKnowledge
  class Config
    DEFAULTS = {
      "collection" => "knowledge",
      "index_path" => "/assets/search-index.json",
      "excerpts"   => false,
    }.freeze

    def initialize(site)
      @opts = DEFAULTS.merge(site.config["dracula_knowledge"] || {})
    end

    def collection
      @opts["collection"].to_s
        .sub(%r{\A\./}, "")
        .sub(%r{\A_}, "")
        .sub(%r{/\z}, "")
    end

    def index_path
      path = @opts["index_path"].to_s
      path.start_with?("/") ? path : "/#{path}"
    end

    def excerpts?
      @opts["excerpts"] == true
    end
  end

  def self.humanize(name)
    name
      .to_s
      .sub(/\.(md|markdown|mdown|html)\z/i, "")
      .sub(/\A\d+[-_.\s]+/, "")
      .tr("_-", "  ")
      .split(/\s+/)
      .reject(&:empty?)
      .map { |word| word.match?(/\A[A-Z0-9]{2,}\z/) ? word : word.capitalize }
      .join(" ")
  end

  class Builder < Jekyll::Generator
    safe true
    priority :normal

    MARKDOWN_EXTENSIONS = %w[
      .md
      .markdown
      .mdown
    ].freeze

    def generate(site)
      cfg = Config.new(site)
      collection = site.collections[cfg.collection]

      unless collection
        Jekyll.logger.warn(
          "Dracula:",
          "collection '#{cfg.collection}' not found"
        )
        return
      end

      promote_static_markdown(site, collection)

      docs = collection.docs.reject do |document|
        document.data["hidden"] == true
      end

      prefix = "_#{cfg.collection}/"

      entries = docs.map do |document|
        entry_for(document, prefix, cfg, site)
      end

      entries.sort_by! do |entry|
        [
          entry["s"].to_s.downcase,
          entry["p"].to_s.downcase,
        ]
      end

      docs.each do |document|
        document.content = TableSpacing.apply(document.content)
      end

      site.data["dk_sections"] = sections_from(entries, site, cfg)
      site.data["dk_total"] = entries.length

      remove_existing_index(site, cfg.index_path)
      site.pages << IndexFile.new(site, cfg.index_path, entries)

      Jekyll.logger.info(
        "Dracula:",
        "indexed #{entries.length} documents"
      )
    end

    private

    def promote_static_markdown(site, collection)
      promoted = []
      retired = []

      collection.files.reject! do |static_file|
        extension = static_file.extname.downcase
        next false unless MARKDOWN_EXTENSIONS.include?(extension)

        document = Jekyll::Document.new(
          static_file.path,
          site: site,
          collection: collection
        )

        document.read

        promoted << document
        retired << static_file

        true
      end

      return if promoted.empty?

      site.static_files -= retired

      collection.docs.concat(promoted)

      collection.docs.sort_by! do |document|
        document.relative_path.to_s.downcase
      end

      Jekyll.logger.info(
        "Dracula:",
        "promoted #{promoted.length} front-matter-less notes"
      )
    end

    def remove_existing_index(site, index_path)
      normalized = index_path.sub(%r{\A/}, "")

      site.pages.reject! do |page|
        page.path.to_s.sub(%r{\A/}, "") == normalized
      end

      site.static_files.reject! do |file|
        file.relative_path.to_s.sub(%r{\A/}, "") == normalized
      end
    end

    def derived_title?(document)
      title = document.data["title"].to_s.strip
      return true if title.empty?

      slug = document.data["slug"].to_s
      return false if slug.empty?

      title == Jekyll::Utils.titleize_slug(slug)
    end

    def entry_for(document, prefix, cfg, site)
      relative_path = document.relative_path
        .to_s
        .sub(%r{\A/}, "")
        .sub(/\A#{Regexp.escape(prefix)}/, "")

      segments = relative_path.split("/")

      section = segments.length > 1 ? segments.first : ""
      subpath = segments.length > 1 ? segments.drop(1).join("/") : relative_path

      if derived_title?(document)
        document.data["title"] =
          DraculaKnowledge.humanize(File.basename(relative_path))
      end

      document.data["dk_section"] = section

      # Include baseurl so routes work in subdirectories (e.g., github.io/blog/).
      baseurl = (site.config["baseurl"] || "").to_s
      url = baseurl + document.url

      entry = {
        "t" => document.data["title"].to_s,
        "u" => url,
        "s" => section,
        "p" => subpath,
      }

      if cfg.excerpts?
        entry["e"] = build_excerpt(document.content)
      end

      entry
    end

    def build_excerpt(content)
      content
        .to_s
        .gsub(/```.*?```/m, " ")
        .gsub(/~~~.*?~~~/m, " ")
        .gsub(/<[^>]+>/, " ")
        .gsub(/[#>*_`\[\]()!-]/, " ")
        .gsub(/\s+/, " ")
        .strip
        .slice(0, 160)
    end

    def sections_from(entries, site, cfg)
      counts = Hash.new(0)

      entries.each do |entry|
        counts[entry["s"]] += 1
      end

      baseurl = site.config["baseurl"].to_s.sub(%r{/\z}, "")
      collection_path = "/#{cfg.collection}/"
      base = "#{baseurl}#{collection_path}"

      counts.keys.sort_by(&:downcase).map do |slug|
        {
          "slug" => slug,
          "title" => slug.empty? ? "Ungrouped" : DraculaKnowledge.humanize(slug),
          "count" => counts[slug],
          "url" => section_url(base, slug),
        }
      end
    end

    def section_url(base, slug)
      return base if slug.empty?

      "#{base}##{Jekyll::Utils.slugify(slug)}"
    end
  end

  module TableSpacing
    TABLE_ROW = %r{\A\s*\|.*\|\s*\z}
    DELIMITER = %r{\A\s*\|(?:\s*:?-{3,}:?\s*\|)+\s*\z}
    FENCE_START = %r{\A\s*(`{3,}|~{3,})}

    def self.apply(content)
      return content unless content.to_s.include?("|")

      lines = content.to_s.split("\n", -1)
      output = []

      fence_character = nil
      fence_length = 0

      lines.each_with_index do |line, index|
        fence = line.match(FENCE_START)

        if fence
          marker = fence[1]
          character = marker[0]
          length = marker.length

          if fence_character.nil?
            fence_character = character
            fence_length = length
          elsif character == fence_character && length >= fence_length
            fence_character = nil
            fence_length = 0
          end

          output << line
          next
        end

        if fence_character.nil? &&
           starts_table?(lines, index) &&
           !output.last.to_s.strip.empty?
          output << ""
        end

        output << line
      end

      output.join("\n")
    end

    def self.starts_table?(lines, index)
      current = lines[index].to_s
      following = lines[index + 1].to_s

      current.match?(TABLE_ROW) &&
        !current.match?(DELIMITER) &&
        following.match?(DELIMITER)
    end
  end

  class IndexFile < Jekyll::PageWithoutAFile
    def initialize(site, path, entries)
      normalized_path = path.to_s.sub(%r{\A/}, "")
      directory = File.dirname(normalized_path)
      directory = "" if directory == "."

      filename = File.basename(normalized_path)

      super(site, site.source, directory, filename)

      self.data = {
        "layout" => nil,
        "sitemap" => false,
      }

      self.content = JSON.generate(
        "entries" => entries
      )

      self.output = content
    end

    def render(*)
      nil
    end

    def render_with_liquid?
      false
    end
  end
end