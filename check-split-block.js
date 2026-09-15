const fs = require('fs');
const cheerio = require('cheerio');
const baseHtml = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(baseHtml);
const html = $('.elementor-element-340d5d7').html();
console.log('sc_item_descr?', html.includes('sc_item_descr'));
console.log('elementor-widget-text-editor?', html.includes('elementor-widget-text-editor'));
const match = html.match(/class="[^"]*text-editor[^"]*"/g);
console.log('Text editor classes:', match);
