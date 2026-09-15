const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const crypto = require('crypto');

const baseDir = __dirname;
const inputFile = path.join(baseDir, 'index.html');
const outputFile = path.join(baseDir, 'index-clean.html');

const assetsDir = path.join(baseDir, 'assets');
const imgDir = path.join(assetsDir, 'images');
const fontDir = path.join(assetsDir, 'fonts');
const cssDir = path.join(assetsDir, 'css');

// Ensure directories exist
[assetsDir, imgDir, fontDir, cssDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

console.log('Reading index.html (this might take a moment)...');
let htmlContent = fs.readFileSync(inputFile, 'utf-8');

console.log('Extracting Base64 assets...');
// Regex to find data URIs
const dataUriRegex = /data:(image|font|application)\/([a-zA-Z0-9.-]+);base64,([a-zA-Z0-9+/=\s]+)/g;

const extractedAssets = new Map();

htmlContent = htmlContent.replace(dataUriRegex, (match, type, ext, base64Data) => {
    // Some fonts use application/vnd.ms-fontobject or similar
    let folder = type === 'image' ? imgDir : fontDir;
    let urlPath = type === 'image' ? 'assets/images' : 'assets/fonts';
    
    // Clean extension
    let cleanExt = ext.replace(/[^a-zA-Z0-9]/g, '');
    if (cleanExt === 'vndmsfontobject') cleanExt = 'eot';
    if (cleanExt === 'xfontwoff') cleanExt = 'woff';
    if (cleanExt === 'truetype') cleanExt = 'ttf';
    if (cleanExt === 'svgxml') cleanExt = 'svg';

    // Hash the data to avoid duplicates
    const hash = crypto.createHash('md5').update(base64Data).digest('hex');
    const filename = `${hash}.${cleanExt}`;
    const filepath = path.join(folder, filename);
    
    if (!extractedAssets.has(hash)) {
        // Decode base64 and save file
        const cleanBase64 = base64Data.replace(/\s/g, ''); // Remove any newlines/spaces
        fs.writeFileSync(filepath, Buffer.from(cleanBase64, 'base64'));
        extractedAssets.set(hash, true);
    }

    return `${urlPath}/${filename}`;
});

console.log(`Extracted ${extractedAssets.size} unique base64 files.`);

console.log('Parsing HTML to extract CSS...');
const $ = cheerio.load(htmlContent, { decodeEntities: false });

let combinedCss = '';

$('style').each((i, elem) => {
    const cssContent = $(elem).html();
    if (cssContent) {
        combinedCss += cssContent + '\n';
    }
    $(elem).remove();
});

const cssFilepath = path.join(cssDir, 'style.css');
fs.writeFileSync(cssFilepath, combinedCss, 'utf-8');
console.log('Extracted CSS to assets/css/style.css');

// Add the external stylesheet link to the head
$('head').append('<link rel="stylesheet" href="assets/css/style.css">\n');

// Write the clean HTML
console.log('Writing clean HTML...');
fs.writeFileSync(outputFile, $.html(), 'utf-8');

console.log('Done! Output saved to index-clean.html');
