const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load(fs.readFileSync('residency-showcase/index.html', 'utf8'));

console.log('Footer:', $('.elementor-element-67b4187').length);
console.log('Main Page Div:', $('div[data-elementor-type="wp-page"]').length);
