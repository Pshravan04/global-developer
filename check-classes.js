const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load(fs.readFileSync('residency-showcase/index.html', 'utf8'));

console.log($('.elementor-element-569555c').attr('class'));
console.log($('.elementor-element-b9c19da').attr('class'));
console.log($('.elementor-element-340d5d7').attr('class'));

console.log($('.elementor-element-569555c').find('.elementor-invisible').length);
