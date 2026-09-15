const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log($('.elementor-element-cf2dce0 .elementor-inner-column').first().html().substring(0, 1000));
