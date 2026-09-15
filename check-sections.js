const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log('4bb4486:', $('.elementor-element-4bb4486').html().substring(0, 300));
console.log('340d5d7:', $('.elementor-element-340d5d7').html().substring(0, 300));
