const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
$('.elementor-top-section').each((i, el) => {
    console.log($(el).attr('data-id'), $(el).find('h2, h3, h4, h5, h6').first().text().trim().substring(0,40));
});
