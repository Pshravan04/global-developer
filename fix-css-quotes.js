const fs = require('fs');
let css = fs.readFileSync('final-build/assets/css/style.css', 'utf8');

// The bad replacements look like url('../fonts/somefont.woff2") or url('../images/img.jpg) or url('../images/img.png')
// Let's just fix all url(...) where it contains ../fonts/ or ../images/
css = css.replace(/url\(\s*['"]?(\.\.\/(?:fonts|images)\/[^'"\s\)]+)['"]?\s*\)/gi, 'url("$1")');

fs.writeFileSync('final-build/assets/css/style.css', css);
console.log('Fixed quotes in style.css');
