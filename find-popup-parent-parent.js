const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log($('.elementor-7074').parent().attr('class'), $('.elementor-7074').parent().attr('id'));
