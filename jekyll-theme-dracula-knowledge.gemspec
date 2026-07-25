# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name     = "jekyll-theme-dracula-knowledge"
  spec.version  = "0.1.0"
  spec.authors  = ["d0c"]
  spec.email    = ["theophile.vast@gmail.com"]

  spec.summary  = "A Dracula-themed Jekyll theme with a searchable, collapsible knowledge-base menu."
  spec.homepage = "https://github.com/d0c/jekyll-theme-dracula-knowledge"
  spec.license  = "MIT"

  spec.files = Dir.glob("{_data,_includes,_layouts,_sass,assets,lib}/**/*", File::FNM_DOTMATCH)
                  .select { |f| File.file?(f) }
                  .concat(%w[LICENSE.txt README.md])
                  .select { |f| File.exist?(f) }

  spec.required_ruby_version = ">= 2.7.0"

  spec.add_runtime_dependency "jekyll", ">= 4.0", "< 5.0"

  spec.add_development_dependency "bundler", ">= 2.0"
end
