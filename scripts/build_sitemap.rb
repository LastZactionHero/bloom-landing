html_files = Dir.glob('**/*.html')

xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"
xml += "<?xml-stylesheet type=\"text/xsl\" href=\"http://www.plantwithbloom.com/sitemap.xml\"?>\n"
xml += "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"

html_files.each do |html_file|
  xml += "  <url>\n"
  xml += "    <loc>http://www.plantwithbloom.com/#{html_file}</loc>\n"
  xml += "    <lastmod>#{Time.now.strftime('%Y-%m-%dT%H:%M:%S%z')}</lastmod>\n"
  xml += "    <changefreq>monthly</changefreq>\n"
  xml += "    <priority>1</priority>\n"
  xml += "  </url>\n"
end

xml += '</urlset>\n'

file = File.open('sitemap.xml', 'w')
file << xml
file.close

# 
# 
# 
#   <url>
#     <loc>http://www.plantwithbloom.com</loc>
#     <lastmod>2015-04-22T14:12:35+00:00</lastmod>
#     <changefreq>monthly</changefreq>
#     <priority>1</priority>
#   </url>
#   <url>
# 