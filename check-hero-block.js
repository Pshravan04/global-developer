const fs = require('fs');
const cheerio = require('cheerio');
const baseHtml = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(baseHtml);
console.log($('.elementor-element-569555c').html().substring(0, 2000));
