const cheerio = require('cheerio');
const $1 = cheerio.load('<div id="base"><div class="item">Source item</div></div>');
const $2 = cheerio.load('<div id="target"><div class="footer">Footer</div></div>');

const $clone = $1('.item').clone();
$2('.footer').before($clone);

console.log($2.html());
