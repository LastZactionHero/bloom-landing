require 'pry'
require 'nokogiri'

html_filenames = Dir.glob("./site/plants/*.html")
html_filenames.each do |html_filename|
  # next unless html_filename.include?("abunda_improved_bacopa")

  html_content = File.read(html_filename)

  plant_name = html_content.match(/(?<=<title>).*(?=<\/title>)/).to_s.split(':').last.strip
  plant_name = plant_name.gsub(/[^A-z0-9 ]+/, '')

  main_content = html_content.rpartition("</h2>").last.strip.rpartition("<hr/>").first.strip

  doc = Nokogiri::XML(main_content,&:noblanks)
  main_content = doc.to_s.gsub("<?xml version=\"1.0\"?>\n", "")
  main_content.gsub!("&quot;);\"/>", "&quot;);\"></div>")

  markdown_content = <<END
---
layout: page
title: #{plant_name}
---

#{main_content}
END
  markdown_content.strip!

  markdown_filename = html_filename.gsub(".html", ".md")
  markdown_file = File.open(markdown_filename, 'w')
  markdown_file << markdown_content
  markdown_file.close

  puts plant_name
end