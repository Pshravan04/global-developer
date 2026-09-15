const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
let output = [];
$('link[rel="stylesheet"]').each((i, el) => {
    output.push($(el).attr('href'));
});
console.log(output.join('\n'));
