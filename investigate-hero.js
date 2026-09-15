const fs = require('fs');
const cheerio = require('cheerio');
const baseHtml = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(baseHtml);
const hero = $('.elementor-element-569555c');

console.log('--- HERO TEXT EDITORS ---');
hero.find('.elementor-widget-text-editor').each((i, el) => {
    console.log(`Editor ${i} HTML:`, $(el).html().substring(0, 300));
    console.log(`Editor ${i} Text:`, $(el).text().trim().replace(/\s+/g, ' ').substring(0, 100));
});

console.log('--- CTAS IN HERO ---');
hero.find('a').each((i, el) => {
    console.log(`Link ${i}:`, $(el).attr('class'), $(el).text().trim());
});

