const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log($('div[data-elementor-type="wp-page"]').html().substring(0, 1500));
