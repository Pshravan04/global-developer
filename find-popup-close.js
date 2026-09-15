const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log('adp-popup-close:', $('.adp-popup-close').length);
console.log('adp-popup-overlay:', $('.adp-popup-overlay').length);
console.log($('.adp-popup-close').parent().html().substring(0, 500));
