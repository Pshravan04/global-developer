const fs = require('fs');
const cheerio = require('cheerio');
const baseHtml = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(baseHtml);

const hero = $('.elementor-element-569555c');
const features = $('.elementor-element-b9c19da');
const split = $('.elementor-element-340d5d7');

console.log('--- FEATURES BLOCK ---');
console.log('Has Lorem ipsum?', features.text().includes('Lorem ipsum'));
// Let's find where the lorem ipsum comes from if not inside .sc_icons_columns_wrap
features.find('*').each((i, el) => {
    if ($(el).text().includes('Lorem ipsum') && $(el).children().length === 0) {
        console.log('Found Lorem ipsum in tag:', el.tagName, 'class:', $(el).attr('class'));
        // log parent tree
        let p = $(el).parent();
        console.log('Parent:', p.attr('class'));
    }
});

console.log('--- HERO BLOCK ---');
console.log('sc_item_title_text length:', hero.find('.sc_item_title_text').length);
console.log('sc_item_descr length:', hero.find('.sc_item_descr').length);
// Print the sc_item_descr html
console.log('sc_item_descr HTML:', hero.find('.sc_item_descr').html());

console.log('--- SPLIT BLOCK ---');
console.log('CTA buttons length:', split.find('.sc_button_default').length);
console.log('Other buttons?', split.find('a[class*="button"]').length);
split.find('a').each((i, el) => {
    if ($(el).text().toLowerCase().includes('read more')) {
        console.log('Read More link classes:', $(el).attr('class'));
    }
});
