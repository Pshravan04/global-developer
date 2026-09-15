const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Hero ---');
console.log($('.elementor-element-569555c').html()?.substring(0, 1000));

console.log('\n--- Features Block ---');
console.log($('.elementor-element-b9c19da').html()?.substring(0, 1000));

console.log('\n--- Modern Interiors Block ---');
console.log($('.elementor-element-340d5d7').html()?.substring(0, 1000));
