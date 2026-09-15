const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log($('.adp-popup').attr('class'), $('.adp-popup').attr('id'));
console.log($('.adp-popup').attr('data-settings'));
