const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('final-build/index.html', 'utf8');
const $ = cheerio.load(html);
$('link[rel="stylesheet"]').each((i, el) => {
    console.log($(el).attr('href'));
});
