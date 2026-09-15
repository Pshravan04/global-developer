const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log('Footer text:', $('footer').text().substring(0, 300).trim().replace(/\s+/g, ' '));
console.log('Footer HTML length:', $('footer').html() ? $('footer').html().length : 0);
