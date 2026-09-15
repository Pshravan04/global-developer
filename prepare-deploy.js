/**
 * prepare-deploy.js
 * Prepares the docs/ folder for GitHub Pages deployment.
 * Copies final-build HTML + assets to docs/ so GitHub Pages can serve everything.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const FINAL_BUILD = path.join(ROOT, 'final-build');
const ASSETS_SRC = path.join(ROOT, 'residency-showcase', 'assets');
const DOCS = path.join(ROOT, 'docs');

// ── Helpers ────────────────────────────────────────────────────────────────────
function copyDir(src, dest) {
    if (!fs.existsSync(src)) { console.warn('  SKIP (not found):', src); return; }
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const s = path.join(src, entry.name);
        const d = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(s, d);
        } else {
            fs.copyFileSync(s, d);
        }
    }
}

function copyFile(src, dest) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
}

// ── Clean docs/ ────────────────────────────────────────────────────────────────
console.log('🗑  Cleaning docs/...');
if (fs.existsSync(DOCS)) {
    fs.rmSync(DOCS, { recursive: true, force: true });
}
fs.mkdirSync(DOCS, { recursive: true });

// ── Copy HTML pages ────────────────────────────────────────────────────────────
console.log('📄 Copying HTML pages...');
const htmlFiles = fs.readdirSync(FINAL_BUILD).filter(f => f.endsWith('.html'));
htmlFiles.forEach(file => {
    copyFile(path.join(FINAL_BUILD, file), path.join(DOCS, file));
    console.log('   ', file);
});

// ── Copy assets ───────────────────────────────────────────────────────────────
console.log('🎨 Copying assets...');
copyDir(ASSETS_SRC, path.join(DOCS, 'assets'));

// ── Copy custom.css if present ───────────────────────────────────────────────
const customCssSrc = path.join(FINAL_BUILD, 'assets', 'css', 'custom.css');
if (fs.existsSync(customCssSrc)) {
    copyFile(customCssSrc, path.join(DOCS, 'assets', 'css', 'custom.css'));
    console.log('   custom.css (from final-build)');
}

// ── Create style.css placeholder if missing ──────────────────────────────────
const styleCssDest = path.join(DOCS, 'assets', 'css', 'style.css');
if (!fs.existsSync(styleCssDest)) {
    // Look in residency-showcase
    const styleOptions = [
        path.join(ROOT, 'residency-showcase', 'assets', 'css', 'style.css'),
        path.join(ROOT, 'final-build', 'assets', 'css', 'style.css'),
    ];
    const found = styleOptions.find(p => fs.existsSync(p));
    if (found) {
        copyFile(found, styleCssDest);
        console.log('   style.css copied from', found);
    }
}

// ── .nojekyll (required for GitHub Pages to serve folders with underscores) ──
fs.writeFileSync(path.join(DOCS, '.nojekyll'), '');
console.log('   .nojekyll');

// ── Summary ───────────────────────────────────────────────────────────────────
const docsFiles = fs.readdirSync(DOCS);
console.log('\n✅ docs/ ready with', docsFiles.length, 'items:');
docsFiles.forEach(f => {
    const stat = fs.statSync(path.join(DOCS, f));
    console.log('  ', stat.isDirectory() ? '[DIR]' : '[FILE]', f);
});

console.log('\n📌 Next step:');
console.log('   1. Go to https://github.com/Pshravan04/global-developer/settings/pages');
console.log('   2. Set Source → "Deploy from a branch"');
console.log('   3. Branch: main, Folder: /docs');
console.log('   4. Save — your site will be live in ~60 seconds!');
