const html = require('fs').readFileSync('final-build/index.html', 'utf8');
const links = [];
const regex = /<link[^>]*href=['"]([^'"]+)['"]/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  if (match[1].includes('font') || match[1].includes('icon')) {
    links.push(match[1]);
  }
}
console.log(links.slice(0, 15).join('\n'));
