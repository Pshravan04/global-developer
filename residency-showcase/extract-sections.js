const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);
$('section').each((i, el) => {
    const sectionClass = $(el).attr('class') || '';
    const heading = $(el).find('h1, h2, h3').first().text().trim();
    if (heading) {
        console.log(`Section ${i}: ${heading}`);
        console.log(`Class: ${sectionClass}`);
        console.log('---');
    }
});
