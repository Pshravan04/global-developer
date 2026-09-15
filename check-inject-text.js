const fs = require('fs');
const code = fs.readFileSync('build-website.js', 'utf8').split('\n');
console.log(code.slice(75, 85).join('\n'));
