const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('final-build/index.html', 'utf8');
const $ = cheerio.load(html);
console.log('Final build wrapper elements:');
$('.elementor-section-wrap > section, .elementor-section-wrap > div').each((i, el) => {
    console.log($(el).attr('class'));
});
