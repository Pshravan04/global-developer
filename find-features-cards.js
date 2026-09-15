const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
console.log('Icon boxes:', $('.elementor-element-b9c19da').find('.elementor-widget-icon-box').length);
console.log('sc_services_item:', $('.elementor-element-b9c19da').find('.sc_services_item').length);
console.log('icon-box-wrapper:', $('.elementor-element-b9c19da').find('.elementor-icon-box-wrapper').length);
console.log('elementor-column:', $('.elementor-element-b9c19da').find('.elementor-column').length);

console.log($('.elementor-element-b9c19da').find('.elementor-column').first().html().substring(0, 1000));
