const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
let popupHTML = '';
$('*:contains("Subscribe for the")').each((i, el) => {
    if ($(el).children().length === 0) {
        popupHTML = $(el).closest('.elementor-section').parent().html();
    }
});
console.log(popupHTML.substring(0, 1000));
