const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
$('img').each((i, el) => {
    if ($(el).attr('src') && ($(el).attr('src').includes('image-83') || $(el).attr('src').includes('image-79'))) {
        console.log('Found image in section: ' + $(el).closest('.elementor-top-section').attr('data-id'));
    }
});
