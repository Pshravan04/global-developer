const fs = require('fs');

let code = fs.readFileSync('build-website.js', 'utf8');

const injectionCode = `
        let $clone;
        if (pageKey === 'faq' && sectionKey === 'hero') {
            // Render hero, then append the FAQ accordion immediately after
            $clone = $heroBlock.clone();
            injectText($clone, section);
            
            // Build FAQ accordion
            let accordionHtml = '<div class="fno-accordion-wrapper" style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">';
            accordionHtml += '<style>.fno-accordion-item { border: 1px solid #d4af37; margin-bottom: 15px; background: #fff; border-radius: 4px;} .fno-accordion-title { padding: 20px; font-weight: bold; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #f4ebd9; color: #0d2b23; font-size: 1.1rem; } .fno-accordion-content { padding: 0 20px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; background: #fff; } .fno-accordion-content p { padding: 20px 0; margin: 0; color: #555; line-height: 1.6; } .fno-accordion-item.active .fno-accordion-content { max-height: 500px; }</style>';
            
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
            
            // Clean up static classes for both
            $clone.removeClass('sc_fly_static elementor-invisible trx_addons_invisible');
            $clone.find('.sc_fly_static, .elementor-invisible, .trx_addons_invisible').removeClass('sc_fly_static elementor-invisible trx_addons_invisible');
            $faqSection.removeClass('sc_fly_static elementor-invisible trx_addons_invisible');
            $faqSection.find('.sc_fly_static, .elementor-invisible, .trx_addons_invisible').removeClass('sc_fly_static elementor-invisible trx_addons_invisible');

            $page.find('.elementor-7074').append($clone);
            $page.find('.elementor-7074').append($faqSection);
            
            isFirst = false;
            continue; // Skip the rest of the loop for this section
            
        } else if (sectionKey === 'legalSections') {
            let legalHtml = '<div style="max-width: 1000px; margin: 0 auto; padding: 40px 20px;">';
            section.forEach(sec => {
                legalHtml += \`<h2 style="color: #0d2b23; margin-top: 40px; margin-bottom: 20px; border-bottom: 1px solid #d4af37; padding-bottom: 10px;">\${sec.title}</h2>\`;
                sec.text.forEach(p => {
                    legalHtml += \`<p style="margin-bottom: 15px; line-height: 1.6; color: #555;">\${p}</p>\`;
                });
            });
            legalHtml += '</div>';
            
            $clone = $splitBlock.clone();
            $clone.find('.elementor-container').html(legalHtml);
            // Don't injectText since we completely replaced html
            
        } else if (isFirst || sectionKey === 'hero') {
`;

// Replace `if (isFirst || sectionKey === 'hero') {` with the injectionCode
// But first, let's locate it safely
const searchStr = `        let $clone;
        if (isFirst || sectionKey === 'hero') {`;

if (code.includes(searchStr)) {
    code = code.replace(searchStr, injectionCode);
    fs.writeFileSync('build-website.js', code);
    console.log('build-website.js successfully updated with FAQ/Legal logic.');
} else {
    console.log('Could not find search string in build-website.js');
}
