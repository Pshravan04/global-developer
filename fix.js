const fs = require('fs');
let c = fs.readFileSync('post-process-homepage.js', 'utf8');
c = c.replace(/\\\`/g, '`').replace(/\\\$/g, '$').replace(/\\\\n/g, '\\n');
fs.writeFileSync('post-process-homepage.js', c);
console.log('Fixed post-process-homepage.js');
