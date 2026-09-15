/**
 * post-process-homepage.js
 * Runs AFTER build-website.js to replace broken Elementor-cloned sections
 * with clean, premium custom HTML sections on the homepage.
 */

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
/* ===== FNO HOMEPAGE PREMIUM STYLES ===== */
:root {
  --fno-green: #0d2b23;
  --fno-gold: #c9a96e;
  --fno-ivory: #f4efe6;
  --fno-light: #f9f6f0;
  --fno-text: #2d2d2d;
  --fno-muted: #6b7280;
  --fno-border: rgba(201,169,110,0.25);
}

/* ===== HERO SECTION ===== */
.fno-hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: var(--fno-green);
}
.fno-hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0d2b23 0%, #1a4a36 50%, #0d2b23 100%);
  z-index: 0;
}
.fno-hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url('assets/images/hero-bg.jpg') center/cover no-repeat;
  opacity: 0.35;
  mix-blend-mode: luminosity;
}
.fno-hero-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 120px 40px 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: end;
}
.fno-hero-left {}
.fno-hero-eyebrow {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--fno-gold);
  margin-bottom: 20px;
  display: block;
}
.fno-hero-title {
  font-size: clamp(2.6rem, 5vw, 4.2rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  margin: 0 0 16px;
}
.fno-hero-tagline {
  font-size: 1rem;
  font-weight: 500;
  color: var(--fno-gold);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 32px;
  border-left: 3px solid var(--fno-gold);
  padding-left: 16px;
}
.fno-hero-btns {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
}
.fno-btn-primary {
  background: var(--fno-gold);
  color: var(--fno-green);
  padding: 14px 32px;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  transition: all 0.3s;
  display: inline-block;
}
.fno-btn-primary:hover { background: #e0bc80; transform: translateY(-2px); }
.fno-btn-outline {
  background: transparent;
  color: #fff;
  padding: 14px 32px;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  border: 1.5px solid rgba(255,255,255,0.5);
  transition: all 0.3s;
  display: inline-block;
}
.fno-btn-outline:hover { border-color: var(--fno-gold); color: var(--fno-gold); }
.fno-hero-right {
  padding-bottom: 10px;
}
.fno-hero-desc {
  color: rgba(255,255,255,0.8);
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 24px;
}
.fno-hero-bottom-line {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--fno-gold);
  letter-spacing: 3px;
  text-transform: uppercase;
  opacity: 0.9;
}

/* ===== INTRO SECTION ===== */
.fno-intro {
  background: var(--fno-ivory);
  padding: 100px 40px;
}
.fno-intro-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
.fno-section-label {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--fno-gold);
  margin-bottom: 20px;
}
.fno-section-title {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 700;
  color: var(--fno-green);
  margin-bottom: 30px;
  line-height: 1.25;
}
.fno-intro p {
  color: var(--fno-muted);
  font-size: 1.05rem;
  line-height: 1.85;
  margin-bottom: 18px;
}
.fno-divider {
  width: 60px;
  height: 3px;
  background: var(--fno-gold);
  margin: 0 auto 40px;
  border-radius: 2px;
}

/* ===== WHY CHOOSE ===== */
.fno-why {
  background: var(--fno-green);
  padding: 100px 40px;
}
.fno-why-inner {
  max-width: 1200px;
  margin: 0 auto;
}
.fno-why-header {
  text-align: center;
  margin-bottom: 64px;
}
.fno-why-header .fno-section-title { color: #fff; }
.fno-why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}
.fno-why-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(201,169,110,0.18);
  padding: 40px 32px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}
.fno-why-card::before {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: var(--fno-gold);
  transform: scaleX(0);
  transition: transform 0.3s;
}
.fno-why-card:hover { background: rgba(255,255,255,0.07); }
.fno-why-card:hover::before { transform: scaleX(1); }
.fno-why-num {
  font-size: 3rem;
  font-weight: 800;
  color: rgba(201,169,110,0.18);
  line-height: 1;
  margin-bottom: 12px;
}
.fno-why-card h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--fno-gold);
  margin-bottom: 14px;
  line-height: 1.3;
}
.fno-why-card p {
  color: rgba(255,255,255,0.65);
  font-size: 0.9rem;
  line-height: 1.75;
}
.fno-why-card.span-2 { grid-column: span 2; }

/* ===== LEADERSHIP ===== */
.fno-leadership {
  background: var(--fno-light);
  padding: 100px 40px;
}
.fno-leadership-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 80px;
  align-items: center;
}
.fno-leadership-left {}
.fno-leadership-left .fno-section-title { text-align: left; margin-bottom: 16px; }
.fno-leadership-badge {
  display: inline-block;
  background: var(--fno-green);
  color: #fff;
  font-size: 0.72rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 8px 18px;
  margin-top: 24px;
  font-weight: 600;
}
.fno-leadership-right {}
.fno-leadership-subtitle {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--fno-green);
  margin-bottom: 20px;
  line-height: 1.3;
}
.fno-leadership-right p {
  color: var(--fno-muted);
  font-size: 0.975rem;
  line-height: 1.8;
  margin-bottom: 16px;
}
.fno-team-list {
  list-style: none;
  padding: 0;
  margin: 28px 0;
  border-top: 1px solid var(--fno-border);
}
.fno-team-list li {
  padding: 14px 0;
  border-bottom: 1px solid var(--fno-border);
  color: var(--fno-text);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 12px;
}
.fno-team-list li::before {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  background: var(--fno-gold);
  border-radius: 50%;
  flex-shrink: 0;
}

/* ===== MARKET INSIGHT ===== */
.fno-insight {
  background: #fff;
  padding: 100px 40px;
  position: relative;
  overflow: hidden;
}
.fno-insight::before {
  content: '"';
  position: absolute;
  top: -40px; right: 60px;
  font-size: 20rem;
  font-weight: 900;
  color: rgba(201,169,110,0.06);
  line-height: 1;
  pointer-events: none;
}
.fno-insight-inner {
  max-width: 1000px;
  margin: 0 auto;
}
.fno-insight-inner .fno-section-title { max-width: 720px; }
.fno-insight-inner p {
  color: var(--fno-muted);
  font-size: 1.05rem;
  line-height: 1.85;
  margin-bottom: 18px;
}

/* ===== UPCOMING PROJECT ===== */
.fno-upcoming {
  background: var(--fno-green);
  padding: 100px 40px;
  position: relative;
  overflow: hidden;
}
.fno-upcoming::after {
  content: '';
  position: absolute;
  top: -100px; right: -100px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(201,169,110,0.12), transparent 70%);
  pointer-events: none;
}
.fno-upcoming-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  align-items: center;
}
.fno-upcoming .fno-section-title { color: #fff; margin-bottom: 12px; }
.fno-upcoming-subtitle {
  color: var(--fno-gold);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 28px;
  text-transform: uppercase;
}
.fno-upcoming p {
  color: rgba(255,255,255,0.7);
  font-size: 0.975rem;
  line-height: 1.8;
  margin-bottom: 16px;
}
.fno-upcoming-details {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(201,169,110,0.25);
  padding: 36px;
  border-radius: 4px;
}
.fno-upcoming-details h4 {
  color: var(--fno-gold);
  font-size: 0.78rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 24px;
  font-weight: 600;
}
.fno-detail-row {
  padding: 14px 0;
  border-bottom: 1px solid rgba(201,169,110,0.15);
  color: rgba(255,255,255,0.8);
  font-size: 0.9rem;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.fno-detail-row:last-child { border-bottom: none; }
.fno-detail-row::before {
  content: '→';
  color: var(--fno-gold);
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 1px;
}

/* ===== LIFESTYLE + CLEAN ENV ===== */
.fno-lifestyle {
  background: var(--fno-ivory);
  padding: 100px 40px;
}
.fno-clean {
  background: var(--fno-light);
  padding: 80px 40px;
}
.fno-lifestyle-inner, .fno-clean-inner {
  max-width: 900px;
  margin: 0 auto;
}
.fno-lifestyle p, .fno-clean p {
  color: var(--fno-muted);
  font-size: 1.05rem;
  line-height: 1.85;
  margin-bottom: 18px;
}
.fno-lifestyle .fno-section-title,
.fno-clean .fno-section-title {
  margin-bottom: 28px;
}

/* ===== PORTFOLIO ===== */
.fno-portfolio {
  background: var(--fno-green);
  padding: 100px 40px;
}
.fno-portfolio-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.fno-portfolio .fno-section-label { color: rgba(201,169,110,0.7); }
.fno-portfolio .fno-section-title { color: #fff; }
.fno-portfolio-subtitle {
  color: var(--fno-gold);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 6px;
}
.fno-portfolio-badge {
  display: inline-block;
  background: var(--fno-gold);
  color: var(--fno-green);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 2px;
  margin-bottom: 28px;
}
.fno-portfolio p {
  color: rgba(255,255,255,0.7);
  font-size: 0.975rem;
  line-height: 1.8;
  margin-bottom: 16px;
}
.fno-portfolio-visual {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(201,169,110,0.2);
  padding: 60px 40px;
  text-align: center;
  border-radius: 4px;
}
.fno-portfolio-logo-text {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--fno-gold);
  letter-spacing: 3px;
  margin-bottom: 8px;
}
.fno-portfolio-visual-label {
  color: rgba(255,255,255,0.4);
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* ===== FINAL CTA ===== */
.fno-final-cta {
  background: linear-gradient(135deg, #0d2b23 0%, #1a5c3a 100%);
  padding: 120px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.fno-final-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(201,169,110,0.1), transparent 70%);
}
.fno-final-cta-inner {
  position: relative;
  max-width: 700px;
  margin: 0 auto;
}
.fno-final-cta .fno-section-title { color: #fff; margin-bottom: 20px; }
.fno-final-cta p {
  color: rgba(255,255,255,0.7);
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 40px;
}
.fno-cta-btns {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .fno-hero-inner,
  .fno-leadership-inner,
  .fno-upcoming-inner,
  .fno-portfolio-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .fno-why-grid { grid-template-columns: 1fr 1fr; }
  .fno-why-card.span-2 { grid-column: span 1; }
}
@media (max-width: 600px) {
  .fno-hero, .fno-intro, .fno-why, .fno-leadership,
  .fno-insight, .fno-upcoming, .fno-lifestyle, .fno-clean,
  .fno-portfolio, .fno-final-cta { padding: 60px 20px; }
  .fno-why-grid { grid-template-columns: 1fr; }
  .fno-hero-inner { padding: 100px 20px 60px; }
}
</style>
`;

// ─── BUILD SECTION HTML ────────────────────────────────────────────────────────
function heroHtml() {
  const hero = h.hero;
  return `
<section class="fno-hero">
  <div class="fno-hero-bg"></div>
  <div class="fno-hero-inner">
    <div class="fno-hero-left">
      <span class="fno-hero-eyebrow">${hero.subtitle || 'Focused Nationwide Opportunities'}</span>
      <h1 class="fno-hero-title">${hero.title}</h1>
      <p class="fno-hero-tagline">${hero.description}</p>
      <div class="fno-hero-btns">
        <a href="upcoming-project.html" class="fno-btn-primary">${hero.primaryCTA || 'Explore Our Vision'}</a>
        <a href="contact-us.html" class="fno-btn-outline">${hero.secondaryCTA || 'Register Your Interest'}</a>
      </div>
    </div>
    <div class="fno-hero-right">
      <p class="fno-hero-desc">${hero.text}</p>
      <div class="fno-hero-bottom-line">${hero.bottomLine || 'Luxury. Location. Legacy.'}</div>
    </div>
  </div>
</section>`;
}

function introHtml() {
  const intro = h.intro;
  const paras = Array.isArray(intro.text) ? intro.text : [intro.text];
  return `
<section class="fno-intro">
  <div class="fno-intro-inner">
    <span class="fno-section-label">Our Story</span>
    <h2 class="fno-section-title">${intro.title}</h2>
    <div class="fno-divider"></div>
    ${paras.map(p => `<p>${p}</p>`).join('')}
  </div>
</section>`;
}

function whyHtml() {
  const wc = h.whyChoose;
  const items = wc.items || [];
  // 5 items: 3 on top row, then 2 on bottom each spanning appropriately
  let cards = items.map((item, i) => {
    // Make 5th card span 2 columns for symmetric look (if 5 items)
    const spanClass = items.length === 5 && i === 4 ? ' span-2' : '';
    return `
    <div class="fno-why-card${spanClass}">
      <div class="fno-why-num">0${i + 1}</div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>`;
  }).join('');

  return `
<section class="fno-why">
  <div class="fno-why-inner">
    <div class="fno-why-header">
      <span class="fno-section-label">Why FNO</span>
      <h2 class="fno-section-title">${wc.title}</h2>
    </div>
    <div class="fno-why-grid">
      ${cards}
    </div>
  </div>
</section>`;
}

function leadershipHtml() {
  const l = h.leadership;
  const paras = l.text.split('\n').filter(p => p.trim());
  return `
<section class="fno-leadership">
  <div class="fno-leadership-inner">
    <div class="fno-leadership-left">
      <span class="fno-section-label">Who We Are</span>
      <h2 class="fno-section-title">${l.title}</h2>
      <span class="fno-leadership-badge">Est. 2025</span>
    </div>
    <div class="fno-leadership-right">
      <p class="fno-leadership-subtitle">${l.subtitle}</p>
      ${paras.map(p => `<p>${p}</p>`).join('')}
      <ul class="fno-team-list">
        ${(l.list || []).map(m => `<li>${m}</li>`).join('')}
      </ul>
      <a href="about-us.html" class="fno-btn-primary">${l.cta || 'Meet Our Promoters'}</a>
    </div>
  </div>
</section>`;
}

function marketInsightHtml() {
  const mi = h.marketInsight;
  const paras = Array.isArray(mi.text) ? mi.text : [mi.text];
  return `
<section class="fno-insight">
  <div class="fno-insight-inner">
    <span class="fno-section-label">Market Insight</span>
    <h2 class="fno-section-title">${mi.title}</h2>
    <div class="fno-divider" style="margin-left:0;"></div>
    ${paras.map(p => `<p>${p}</p>`).join('')}
  </div>
</section>`;
}

function upcomingProjectHtml() {
  const up = h.upcomingProject;
  const paras = Array.isArray(up.text) ? up.text : [up.text];
  const details = Array.isArray(up.list) ? up.list : [];
  return `
<section class="fno-upcoming">
  <div class="fno-upcoming-inner">
    <div>
      <span class="fno-section-label">Upcoming Project</span>
      <h2 class="fno-section-title">${up.title}</h2>
      <p class="fno-upcoming-subtitle">${up.subtitle || ''}</p>
      ${paras.map(p => `<p>${p}</p>`).join('')}
      <a href="upcoming-project.html" class="fno-btn-primary" style="margin-top:16px;">${up.cta || 'Register Early Interest'}</a>
    </div>
    <div class="fno-upcoming-details">
      <h4>Project Details</h4>
      ${details.map(d => `<div class="fno-detail-row">${d}</div>`).join('')}
    </div>
  </div>
</section>`;
}

function lifestyleHtml() {
  const ls = h.lifestyle;
  const paras = Array.isArray(ls.text) ? ls.text : [ls.text];
  return `
<section class="fno-lifestyle">
  <div class="fno-lifestyle-inner">
    <span class="fno-section-label">The Location</span>
    <h2 class="fno-section-title">${ls.title}</h2>
    <div class="fno-divider" style="margin-left:0;"></div>
    ${paras.map(p => `<p>${p}</p>`).join('')}
  </div>
</section>`;
}

function cleanEnvHtml() {
  const ce = h.cleanEnvironment;
  const paras = Array.isArray(ce.text) ? ce.text : [ce.text];
  return `
<section class="fno-clean">
  <div class="fno-clean-inner">
    <span class="fno-section-label">Why Goa</span>
    <h2 class="fno-section-title">${ce.title}</h2>
    ${paras.map(p => `<p>${p}</p>`).join('')}
  </div>
</section>`;
}

function portfolioHtml() {
  const pt = h.portfolio;
  const paras = Array.isArray(pt.text) ? pt.text : [pt.text];
  const badge = Array.isArray(pt.list) && pt.list.length > 0 ? pt.list[0] : '';
  return `
<section class="fno-portfolio">
  <div class="fno-portfolio-inner">
    <div>
      <span class="fno-section-label">Our Work</span>
      <h2 class="fno-section-title">${pt.title}</h2>
      <p class="fno-portfolio-subtitle">${pt.subtitle || ''}</p>
      ${badge ? `<div class="fno-portfolio-badge">${badge}</div>` : ''}
      ${paras.map(p => `<p>${p}</p>`).join('')}
    </div>
    <div class="fno-portfolio-visual">
      <div class="fno-portfolio-logo-text">FNO</div>
      <div class="fno-portfolio-visual-label">Luxe Heaven Villas<br>Porvorim · North Goa</div>
    </div>
  </div>
</section>`;
}

function finalCtaHtml() {
  const fc = h.finalCta;
  const btns = Array.isArray(fc.buttons) ? fc.buttons : [];
  return `
<section class="fno-final-cta">
  <div class="fno-final-cta-inner">
    <span class="fno-section-label" style="color:rgba(201,169,110,0.7);">Get Started</span>
    <h2 class="fno-section-title">${fc.title}</h2>
    <p>${typeof fc.text === 'string' ? fc.text : (Array.isArray(fc.text) ? fc.text.join(' ') : '')}</p>
    <div class="fno-cta-btns">
      ${btns.length > 0 ? `<a href="contact-us.html" class="fno-btn-primary">${btns[0]}</a>` : ''}
      ${btns.length > 1 ? `<a href="contact-us.html" class="fno-btn-outline">${btns[1]}</a>` : ''}
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
  marketInsightHtml() +
  upcomingProjectHtml() +
  lifestyleHtml() +
  cleanEnvHtml() +
  portfolioHtml() +
  finalCtaHtml();

$target.append(sectionsHtml);

// 5. Write out
fs.writeFileSync(indexPath, $.html());
console.log('✅ Homepage post-processing complete!');
