const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log($('.swiper-container').first().attr('class'), $('.swiper-container').first().attr('data-settings'));
