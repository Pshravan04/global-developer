const fs = require('fs');

let code = fs.readFileSync('build-website.js', 'utf8');

code = code.replace(/\$\.find\('\.elementor-7074'\)/g, "$('.elementor-7074')");

fs.writeFileSync('build-website.js', code);
console.log('Fixed build-website.js selectors.');
