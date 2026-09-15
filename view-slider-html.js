const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log($('.elementor-element-340d5d7 .elementor-widget-trx_widget_slider').html().substring(0, 500));
