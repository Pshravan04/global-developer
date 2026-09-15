const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Top-level sections:');
$('.elementor-top-section').each((i, el) => {
    const $el = $(el);
    let classes = $el.attr('class').split(' ').filter(c => c.startsWith('elementor-element-') || c === 'elementor-section-height-full').join(' ');
    let title = $el.find('.sc_item_title_text').first().text().trim() || $el.find('.elementor-heading-title').first().text().trim() || 'No title';
    console.log(`[${i}] ${classes} - Title: ${title}`);
});
