const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log('accordion:', $('.elementor-widget-accordion').length);
console.log('toggle:', $('.elementor-widget-toggle').length);
console.log('sc_accordion:', $('.sc_accordion').length);
console.log('trx_addons_accordion:', $('.trx_addons_accordion').length);
