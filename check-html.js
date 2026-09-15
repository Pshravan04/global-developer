const fs = require('fs');
const cheerio = require('cheerio');
const baseHtml = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(baseHtml);
console.log('sc_item_descr length:', $('.elementor-element-340d5d7').find('.sc_item_descr').length);
console.log('elementor-widget-text-editor length:', $('.elementor-element-340d5d7').find('.elementor-widget-text-editor').length);
console.log('elementor-text-editor length:', $('.elementor-element-340d5d7').find('.elementor-text-editor').length);
