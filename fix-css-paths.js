const fs = require('fs');
let css = fs.readFileSync('final-build/assets/css/style.css', 'utf8');
css = css.replace(/url\(\s*['"]?assets\/(fonts|images)\//gi, "url('../$1/");
fs.writeFileSync('final-build/assets/css/style.css', css);
console.log('Fixed paths in style.css');
