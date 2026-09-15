const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);

const children = $('div[data-elementor-type="wp-page"]').children();
console.log('Children of wp-page:');
children.each((i, el) => {
    console.log(el.tagName + ' : ' + $(el).attr('class'));
});

console.log('---');
console.log('Footer: ', $('.elementor-element-67b4187').parent().attr('class'));
