const html = require('fs').readFileSync('final-build/index.html', 'utf8');
const regex = /(href|src)=["']([^"']*wp-content[^"']*)["']/g;
const links = [];
let match;
while ((match = regex.exec(html)) !== null) {
  links.push(match[2]);
}
console.log(links.slice(0, 15).join('\n'));
