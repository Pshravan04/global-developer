const fs = require('fs');
const html = fs.readFileSync('final-build/index.html', 'utf8');
const regex = /(?:href|src)=["']([^"']+)["']/g;
const paths = new Set();
let m;
while ((m = regex.exec(html)) !== null) {
    const u = m[1];
    if (!u.startsWith('http') && !u.startsWith('#') && !u.startsWith('data:') && !u.startsWith('mailto:') && u.trim()) {
        paths.add(u.split('?')[0]);
    }
}
const sorted = [...paths].sort();
sorted.forEach(p => console.log(p));
