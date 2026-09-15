const fs = require('fs'); 
const html = fs.readFileSync('final-build/index.html', 'utf8'); 
const matches = html.match(/(https?:\/\/[^\s"'<>]*wp-content[^\s"'<>]*)/gi) || []; 
[...new Set(matches)].slice(0, 20).forEach(m => console.log(m));
