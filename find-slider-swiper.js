const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log($('.slider_swiper').attr('class'));
console.log($('.slider_swiper').attr('data-settings'));
