const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
const widgets = new Set();
$('.elementor-element-b9c19da').find('[class*="elementor-widget-"]').each((i, el) => {
    $(el).attr('class').split(' ').forEach(c => {
        if (c.startsWith('elementor-widget-') && c !== 'elementor-widget-wrap') widgets.add(c);
    });
});
console.log(Array.from(widgets).join('\n'));
