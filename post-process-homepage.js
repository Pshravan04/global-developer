const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');
const content = require('./content.json');
const h = content.pages.index;

const indexPath = path.join(__dirname, 'final-build', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
const $ = cheerio.load(html);

// ─── CUSTOM CSS ────────────────────────────────────────────────────────────────
const customCss = `
<style id="fno-homepage-css">
/* ===== FNO HOMEPAGE ULTRA-PREMIUM STYLES ===== */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

:root {
  --fno-green: #0A1F18;
  --fno-green-light: #153228;
  --fno-navy: #1B2A47;
  --fno-gold: #D4AF37;
  --fno-gold-light: #E8CC81;
  --fno-ivory: #FDFBF7;
  --fno-sand: #F2ECE0;
  --fno-text: #2C3E38;
  --fno-muted: #6C7A74;
}

body {
  font-family: 'Outfit', sans-serif;
  color: var(--fno-text);
  background: var(--fno-ivory);
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
}

/* Animations */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-up { animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
.animate-scale { animation: scaleIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
.delay-1 { animation-delay: 0.2s; opacity: 0; }
.delay-2 { animation-delay: 0.4s; opacity: 0; }
.delay-3 { animation-delay: 0.6s; opacity: 0; }

/* Global components */
.fno-section-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--fno-gold);
  margin-bottom: 24px;
  position: relative;
}
.fno-section-label::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  margin-left: 15px;
  width: 40px;
  height: 1px;
  background: var(--fno-gold);
}

.fno-section-title {
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 600;
  line-height: 1.15;
  margin-bottom: 30px;
}

.fno-btn-primary {
  background: var(--fno-gold);
  color: var(--fno-green);
  padding: 16px 36px;
  font-weight: 500;
  font-size: 0.9rem;
  font-family: 'Outfit', sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--fno-gold);
}
.fno-btn-primary::after { content: '→'; font-size: 1.2rem; transition: transform 0.3s; }
.fno-btn-primary:hover { background: transparent; color: var(--fno-gold); }
.fno-btn-primary:hover::after { transform: translateX(5px); }

.fno-btn-outline {
  background: transparent;
  color: var(--fno-ivory);
  padding: 16px 36px;
  font-weight: 500;
  font-size: 0.9rem;
  font-family: 'Outfit', sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0;
  transition: all 0.4s;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(253,251,247,0.3);
}
.fno-btn-outline:hover { border-color: var(--fno-gold); color: var(--fno-gold); background: rgba(212,175,55,0.05); }

/* ===== HERO SECTION ===== */
.fno-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--fno-green);
  overflow: hidden;
}
.fno-hero-bg {
  position: absolute;
  inset: 0;
  background: url('assets/images/hero-bg.jpg') center/cover no-repeat;
  opacity: 0.25;
  transform: scale(1.05);
  animation: slowZoom 20s infinite alternate linear;
}
@keyframes slowZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
.fno-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(10,31,24,0.95) 0%, rgba(10,31,24,0.7) 100%);
}
.fno-hero-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 180px 40px 100px; /* high top padding to avoid header overlap */
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  align-items: center;
}
.fno-hero-eyebrow {
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: var(--fno-gold);
  margin-bottom: 30px;
  display: block;
}
.fno-hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 500;
  color: var(--fno-ivory);
  line-height: 1.05;
  margin: 0 0 24px;
}
.fno-hero-tagline {
  font-size: 1.2rem;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: var(--fno-gold-light);
  margin-bottom: 40px;
  border-left: 2px solid var(--fno-gold);
  padding-left: 20px;
}
.fno-hero-btns {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.fno-hero-right {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 50px;
}
.fno-hero-desc {
  color: rgba(253,251,247,0.85);
  font-size: 1.1rem;
  line-height: 1.8;
  font-weight: 300;
  margin-bottom: 30px;
}
.fno-hero-bottom-line {
  font-size: 1rem;
  font-weight: 500;
  color: var(--fno-gold);
  letter-spacing: 4px;
  text-transform: uppercase;
}

/* ===== SHARED SECTIONS ===== */
.fno-section {
  padding: 120px 40px;
  position: relative;
}
.fno-section-inner {
  max-width: 1200px;
  margin: 0 auto;
}
.fno-bg-ivory { background: var(--fno-ivory); }
.fno-bg-sand { background: var(--fno-sand); }
.fno-bg-green { background: var(--fno-green); color: var(--fno-ivory); }
.fno-bg-green .fno-section-title { color: var(--fno-ivory); }
.fno-bg-green p { color: rgba(253,251,247,0.8); }

/* ===== OUR STORY ===== */
.fno-story {
  text-align: center;
  max-width: 900px !important;
}
.fno-story p {
  font-size: 1.15rem;
  line-height: 1.9;
  color: var(--fno-text);
  margin-bottom: 24px;
  font-weight: 300;
}
.fno-story p:first-of-type {
  font-size: 1.4rem;
  font-family: 'Playfair Display', serif;
  color: var(--fno-green);
}

/* ===== WHY CHOOSE ===== */
.fno-why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 60px;
}
.fno-why-card {
  background: var(--fno-green-light);
  padding: 50px 40px;
  transition: transform 0.4s, background 0.4s;
  border: 1px solid rgba(212,175,55,0.1);
}
.fno-why-card:hover {
  transform: translateY(-10px);
  background: #193c30;
  border-color: rgba(212,175,55,0.3);
}
.fno-why-num {
  font-size: 3.5rem;
  font-family: 'Playfair Display', serif;
  color: rgba(212,175,55,0.2);
  line-height: 1;
  margin-bottom: 20px;
}
.fno-why-card h3 {
  font-size: 1.3rem;
  color: var(--fno-ivory);
  margin-bottom: 16px;
  letter-spacing: 1px;
}
.fno-why-card p {
  color: rgba(253,251,247,0.7);
  font-size: 0.95rem;
  line-height: 1.7;
  font-weight: 300;
}

/* ===== LEADERSHIP ===== */
.fno-leadership-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.fno-leadership-left h2 { color: var(--fno-green); }
.fno-leadership-right p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  font-weight: 300;
}
.fno-team-list {
  list-style: none;
  padding: 0;
  margin: 40px 0;
  display: grid;
  gap: 15px;
}
.fno-team-list li {
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(10,31,24,0.1);
  color: var(--fno-green);
  font-size: 1.05rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 15px;
}
.fno-team-list li::before {
  content: '✦';
  color: var(--fno-gold);
  font-size: 1.2rem;
}

/* ===== UPCOMING PROJECT ===== */
.fno-upcoming {
  text-align: center;
}
.fno-upcoming .fno-section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
}
.fno-upcoming-subtitle {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--fno-gold);
  margin-bottom: 40px;
  font-style: italic;
}
.fno-upcoming-content {
  max-width: 800px;
  margin: 0 auto 50px;
}
.fno-upcoming-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  font-weight: 300;
}
.fno-details-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
}
.fno-detail-badge {
  background: rgba(212,175,55,0.1);
  border: 1px solid rgba(212,175,55,0.3);
  color: var(--fno-ivory);
  padding: 12px 24px;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

/* ===== PORTFOLIO ===== */
.fno-portfolio-inner {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: center;
}
.fno-portfolio-visual {
  background: url('assets/images/portfolio-bg.jpg') center/cover no-repeat;
  background-color: var(--fno-green-light); /* fallback */
  height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 10px solid var(--fno-ivory);
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}
.fno-portfolio-visual::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(10,31,24,0.6);
}
.fno-portfolio-logo-text {
  position: relative;
  font-size: 2.5rem;
  font-family: 'Playfair Display', serif;
  color: var(--fno-gold);
  margin-bottom: 15px;
}
.fno-portfolio-visual-label {
  position: relative;
  color: var(--fno-ivory);
  font-size: 1.2rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-align: center;
}
.fno-sold-out {
  position: absolute;
  top: 30px;
  right: 30px;
  background: #a93226;
  color: #fff;
  padding: 8px 16px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 991px) {
  .fno-hero-inner, .fno-leadership-inner, .fno-portfolio-inner {
    grid-template-columns: 1fr;
    gap: 50px;
  }
  .fno-hero-inner { padding-top: 140px; }
}
@media (max-width: 767px) {
  .fno-section { padding: 80px 20px; }
  .fno-hero-inner { padding-top: 120px; }
  .fno-hero-right { padding: 30px; }
  .fno-why-card { padding: 30px; }
  .fno-btn-primary, .fno-btn-outline { width: 100%; justify-content: center; }
}
</style>
`;

// ─── HELPER ────────────────────────────────────────────────────────────────
function parseText(text) {
  if (Array.isArray(text)) return text.map(t => `<p>${t}</p>`).join('');
  if (typeof text === 'string') return `<p>${text.replace(/\n/g, '<br><br>')}</p>`;
  return '';
}

// ─── BUILD SECTION HTML ────────────────────────────────────────────────────────
function heroHtml() {
  const hero = h.hero;
  return `
<section class="fno-hero">
  <div class="fno-hero-bg"></div>
  <div class="fno-hero-overlay"></div>
  <div class="fno-hero-inner">
    <div class="fno-hero-left animate-up">
      <span class="fno-hero-eyebrow">${hero.subtitle || 'Focused Nationwide Opportunities'}</span>
      <h1 class="fno-hero-title">${hero.title}</h1>
      <p class="fno-hero-tagline">${hero.description || 'Premium Real Estate Destinations, Built with Vision and Experience'}</p>
      <div class="fno-hero-btns">
        <a href="upcoming-project.html" class="fno-btn-primary">${hero.primaryCTA || 'Explore Our Vision'}</a>
        <a href="contact-us.html" class="fno-btn-outline">${hero.secondaryCTA || 'Register Your Interest'}</a>
      </div>
    </div>
    <div class="fno-hero-right animate-scale delay-1">
      <div class="fno-hero-desc">${parseText(hero.text)}</div>
      <div class="fno-hero-bottom-line">${hero.bottomLine || 'Luxury. Location. Legacy.'}</div>
    </div>
  </div>
</section>`;
}

function introHtml() {
  const intro = h.intro;
  return `
<section class="fno-section fno-bg-ivory">
  <div class="fno-section-inner fno-story animate-up">
    <span class="fno-section-label">Our Story</span>
    <h2 class="fno-section-title">${intro.title}</h2>
    ${parseText(intro.text)}
  </div>
</section>`;
}

function whyHtml() {
  const wc = h.whyChoose;
  const items = wc.items || [];
  let cards = items.map((item, i) => `
    <div class="fno-why-card">
      <div class="fno-why-num">0${i + 1}</div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>`).join('');

  return `
<section class="fno-section fno-bg-green">
  <div class="fno-section-inner animate-up">
    <span class="fno-section-label">Why Choose FNO</span>
    <h2 class="fno-section-title">${wc.title}</h2>
    <div class="fno-why-grid">
      ${cards}
    </div>
  </div>
</section>`;
}

function leadershipHtml() {
  const l = h.leadership;
  return `
<section class="fno-section fno-bg-sand">
  <div class="fno-section-inner fno-leadership-inner animate-up">
    <div class="fno-leadership-left">
      <span class="fno-section-label">Leadership</span>
      <h2 class="fno-section-title">${l.title}</h2>
      <a href="about-us.html" class="fno-btn-primary" style="margin-top:20px;">${l.cta || 'Meet Our Promoters'}</a>
    </div>
    <div class="fno-leadership-right">
      <h3 style="font-size:1.5rem; color:var(--fno-gold); margin-bottom:20px;">${l.subtitle}</h3>
      ${parseText(l.text)}
      <ul class="fno-team-list">
        ${(l.list || []).map(m => `<li>${m}</li>`).join('')}
      </ul>
    </div>
  </div>
</section>`;
}

function upcomingProjectHtml() {
  const up = h.upcomingProject;
  const details = Array.isArray(up.list) ? up.list : [];
  return `
<section class="fno-section fno-bg-green fno-upcoming">
  <div class="fno-section-inner animate-up">
    <span class="fno-section-label" style="margin: 0 auto 24px;">Upcoming Project</span>
    <h2 class="fno-section-title">${up.title}</h2>
    <div class="fno-upcoming-subtitle">${up.subtitle || 'North of Goa'}</div>
    <div class="fno-upcoming-content">
      ${parseText(up.text)}
    </div>
    <div class="fno-details-grid">
      ${details.map(d => `<div class="fno-detail-badge">${d}</div>`).join('')}
    </div>
    <a href="upcoming-project.html" class="fno-btn-primary">${up.cta || 'Register Early Interest'}</a>
  </div>
</section>`;
}

function portfolioHtml() {
  const pt = h.portfolio;
  return `
<section class="fno-section fno-bg-ivory">
  <div class="fno-section-inner fno-portfolio-inner animate-up">
    <div>
      <span class="fno-section-label">Our Work</span>
      <h2 class="fno-section-title" style="color:var(--fno-green);">${pt.title}</h2>
      <h3 style="font-size:1.3rem; color:var(--fno-gold); margin-bottom:20px; font-family:'Outfit', sans-serif;">${pt.subtitle || 'Completed Projects'}</h3>
      <div style="color:var(--fno-muted); margin-bottom:30px;">
        ${parseText(pt.text)}
      </div>
    </div>
    <div class="fno-portfolio-visual">
      <div class="fno-sold-out">Sold Out</div>
      <div class="fno-portfolio-logo-text">FNO</div>
      <div class="fno-portfolio-visual-label">Luxe Heaven Villas<br><span style="font-size:0.8rem; font-weight:400; opacity:0.8;">Porvorim · North Goa</span></div>
    </div>
  </div>
</section>`;
}

// ─── INJECT INTO PAGE ─────────────────────────────────────────────────────────
// 1. Inject CSS into head
$('head').append(customCss);

// 2. Find the main elementor page content wrapper
let $target = $('[data-elementor-type="wp-page"]');
if (!$target.length) $target = $('.elementor-7074');

// 3. Clear all Elementor-generated sections inside the page wrapper
$target.find('.elementor-section.elementor-top-section').remove();

// 4. Inject our custom sections
const sectionsHtml = 
  heroHtml() +
  introHtml() +
  whyHtml() +
  leadershipHtml() +
  upcomingProjectHtml() +
  portfolioHtml();

$target.append(sectionsHtml);

// 5. Write out
fs.writeFileSync(indexPath, $.html());
console.log('✅ Homepage post-processing complete!');
