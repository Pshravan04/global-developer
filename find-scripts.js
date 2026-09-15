const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
$('script').each((i, el) => {
    const src = $(el).attr('src');
    if (src) console.log(src);
});
