const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log($('.elementor-element-d394f72').parent().attr('class'), $('.elementor-element-d394f72').parent().attr('data-elementor-type'));
