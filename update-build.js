const fs = require('fs');

let code = fs.readFileSync('build-website.js', 'utf8');

// 1. Footer disclaimer update
// Currently, the footer is heavily nested. The easiest way is to append it to the copyright section.
const footerInjectStr = `
    // Add Footer Disclaimer
    if (contentData.global.footerDisclaimer) {
        $('.sc_layouts_row_type_compact .sc_layouts_column_align_right').first().prepend(
            '<div style="font-size: 0.8rem; line-height: 1.4; color: #888; padding-bottom: 10px; max-width: 600px;">' + contentData.global.footerDisclaimer + '</div>'
        );
    }
`;

// 2. FAQ section handling
const faqLogicStr = `
        } else if (pageKey === 'faq') {
            let accordionHtml = '<div class="fno-accordion-wrapper" style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">';
            accordionHtml += '<style>.fno-accordion-item { border: 1px solid #d4af37; margin-bottom: 15px; background: #fff; } .fno-accordion-title { padding: 20px; font-weight: bold; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #f4ebd9; color: #0d2b23; } .fno-accordion-content { padding: 0 20px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; } .fno-accordion-content p { padding: 20px 0; margin: 0; } .fno-accordion-item.active .fno-accordion-content { max-height: 500px; }</style>';
            
            contentData.faq.forEach(item => {
                accordionHtml += \`
                    <div class="fno-accordion-item">
                        <div class="fno-accordion-title">\${item.q} <span>+</span></div>
                        <div class="fno-accordion-content"><p>\${item.a}</p></div>
                    </div>
                \`;
            });
            accordionHtml += '</div>';
            
            accordionHtml += \`
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        document.querySelectorAll('.fno-accordion-title').forEach(title => {
                            title.addEventListener('click', function() {
                                const item = this.parentElement;
                                const isActive = item.classList.contains('active');
                                document.querySelectorAll('.fno-accordion-item').forEach(i => {
                                    i.classList.remove('active');
                                    i.querySelector('.fno-accordion-title span').textContent = '+';
                                });
                                if (!isActive) {
                                    item.classList.add('active');
                                    this.querySelector('span').textContent = '-';
                                }
                            });
                        });
                    });
                </script>
            \`;
            
            const $faqSection = $splitBlock.clone();
            $faqSection.find('.elementor-container').html(accordionHtml);
            $page.find('.elementor-7074').append($faqSection);
`;

// 3. Legal section handling
const legalLogicStr = `
        } else if (pageKey === 'legal') {
            let legalHtml = '<div style="max-width: 1000px; margin: 0 auto; padding: 40px 20px;">';
            pageData.legalSections.forEach(sec => {
                legalHtml += \`<h2 style="color: #0d2b23; margin-top: 40px; margin-bottom: 20px; border-bottom: 1px solid #d4af37; padding-bottom: 10px;">\${sec.title}</h2>\`;
                sec.text.forEach(p => {
                    legalHtml += \`<p style="margin-bottom: 15px; line-height: 1.6;">\${p}</p>\`;
                });
            });
            legalHtml += '</div>';
            
            const $legalSection = $splitBlock.clone();
            $legalSection.find('.elementor-container').html(legalHtml);
            $page.find('.elementor-7074').append($legalSection);
`;

// Search for the end of the sections logic
if (!code.includes("else if (pageKey === 'faq')")) {
    const splitIndex = code.indexOf(`        } else if (pageData.contentBlocks) {`);
    if (splitIndex !== -1) {
        code = code.slice(0, splitIndex) + faqLogicStr + legalLogicStr + code.slice(splitIndex);
    }
}

// Append footer disclaimer logic just before updating navigation links
if (!code.includes("Add Footer Disclaimer")) {
    const navIndex = code.indexOf(`// Update navigation links`);
    if (navIndex !== -1) {
        code = code.slice(0, navIndex) + footerInjectStr + code.slice(navIndex);
    }
}

// 4. Update Microcopy / CTAs
// The document says: 
// Secondary CTA: Register Your Interest
// Primary CTA: Explore Our Vision
// We can find buttons globally and update their text.
const ctaInjectStr = `
    // Update global CTAs
    $page.find('.sc_button_default').each((i, el) => {
        let text = $(el).find('.sc_button_text').text().trim();
        if (text.toLowerCase().includes('read more')) {
            $(el).find('.sc_button_text').text(contentData.global.ctaPrimary || 'Explore Our Vision');
        }
        if (text.toLowerCase().includes('get in touch') || text.toLowerCase().includes('buy tickets')) {
            $(el).find('.sc_button_text').text(contentData.global.ctaSecondary || 'Register Your Interest');
            $(el).attr('href', 'contact-us.html');
        }
    });
`;

if (!code.includes("Update global CTAs")) {
    const navIndex2 = code.indexOf(`// Update navigation links`);
    if (navIndex2 !== -1) {
        code = code.slice(0, navIndex2) + ctaInjectStr + code.slice(navIndex2);
    }
}

fs.writeFileSync('build-website.js', code);
console.log('build-website.js updated.');
