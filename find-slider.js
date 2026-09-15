const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
$('.elementor-widget-trx_widget_slider').each((i, el) => {
    console.log('Slider found in section: ' + $(el).closest('.elementor-top-section').attr('data-id'));
});
