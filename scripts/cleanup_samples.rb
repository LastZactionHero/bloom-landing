require 'pry'
require 'nokogiri'

html_filenames = Dir.glob("./site/samples/*.html")
html_filenames.each do |html_filename|
  html_content = File.read(html_filename)

  doc = Nokogiri::HTML(html_content,&:noblanks)
  main_content = doc.css(".bed-container").to_s
  main_content.gsub!("./images/", "/images/samples/")

  city_state = doc.xpath("//title").text.split(":").last.strip.gsub("Designs for ", "")
  city = city_state.split(",").first
  state = city_state.split(",").last.strip

  markdown_content = <<END
---
layout: page
title: Landscape designs for #{city}, #{state}
---
#### Planting in #{city}? Here is a yard we designed with plants that will grow in your area.

#{main_content}
END
  markdown_content.strip!

  markdown_filename = html_filename.gsub(".html", ".md")
  markdown_file = File.open(markdown_filename, 'w')
  markdown_file << markdown_content
  markdown_file.close

  # break
end