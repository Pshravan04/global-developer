const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const contentData = JSON.parse(fs.readFileSync('content.json', 'utf8'));
const baseHtml = fs.readFileSync('residency-showcase/index.html', 'utf8');

const outputDir = path.join(__dirname, 'final-build');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const $base = cheerio.load(baseHtml);
const $heroBlock = $base('.elementor-element-569555c').closest('.elementor-section');
$heroBlock.removeClass('elementor-section-content-bottom').addClass('elementor-section-content-middle');
$heroBlock.find('.sc_item_title').addClass('fno-hero-title');
const $featuresBlock = $base('.elementor-element-b9c19da').clone(); // Only the best
const $splitBlock = $base('.elementor-element-340d5d7').clone(); // Split image/text

// Helper to inject text properly
function injectText($clone, section) {
    if (section.title) {
        $clone.find('.sc_item_title_text').first().text(section.title);
        $clone.find('.elementor-heading-title').first().text(section.title);
    } else {
        $clone.find('.sc_item_title_text').first().text('');
        $clone.find('.elementor-heading-title').first().text('');
    }

    let textContent = '';
    if (typeof section.text === 'string') {
        textContent = `<p>${section.text.replace(/\n/g, '<br>')}</p>`;
    } else if (Array.isArray(section.text)) {
        textContent = section.text.map(t => `<p>${t}</p>`).join('');
    }
    
    let prefix = '';
    if (section.subtitle) {
        prefix += `<h4 style="margin-bottom:15px; color:#d4af37;">${section.subtitle}</h4>`;
    }
    if (section.description) {
        prefix += `<p><strong>${section.description}</strong></p>`;
    }
    textContent = prefix + textContent;

    let itemsArray = null;
    if (Array.isArray(section)) itemsArray = section;
    else if (section.items && Array.isArray(section.items)) itemsArray = section.items;
    else if (section.features && Array.isArray(section.features)) itemsArray = section.features;
    else if (section.list && Array.isArray(section.list)) itemsArray = section.list;

    if (itemsArray && $clone.find('.sc_icons_columns_wrap').length > 0) {
        const $wrap = $clone.find('.sc_icons_columns_wrap');
        $wrap.empty();
        const icons = ['icon-house-one', 'icon-house-two', 'icon-house-three', 'icon-house-four', 'icon-house-five', 'icon-house-six'];
        itemsArray.forEach((f, index) => {
            const itemTitle = f.title || f;
            const itemDesc = f.desc || '';
            const icon = icons[index % icons.length];
            $wrap.append(`
                <div class="trx_addons_column-1_3 trx_addons_column-1_2-mobile" style="margin-bottom: 30px;">
                    <div class="sc_icons_item">
                        <div class="sc_icons_icon sc_icon_type_ ${icon}"><span class="sc_icon_type_ ${icon}"></span></div>
                        <div class="sc_icons_item_details">
                            <h4 class="sc_icons_item_title">${itemTitle}</h4>
                            <div class="sc_icons_item_description"><span>${itemDesc}</span></div>
                        </div>
                    </div>
                </div>
            `);
        });
    } else if (itemsArray) {
        // Fallback for blocks without the grid
        textContent += '<ul>' + itemsArray.map(f => {
            const title = f.title ? `<strong>${f.title}</strong>: ` : '';
            const desc = f.desc || (typeof f === 'string' ? f : '');
            return `<li>${title}${desc}</li>`;
        }).join('') + '</ul>';
    }

    if (textContent) {
        if ($clone.find('.sc_item_descr').length > 0) {
            $clone.find('.sc_item_descr').first().html(textContent);
        } else if ($clone.find('.elementor-widget-text-editor').length > 0) {
            $clone.find('.elementor-widget-text-editor .elementor-widget-container').first().html(textContent);
        }
    } else {
        if ($clone.find('.sc_item_descr').length > 0) {
            $clone.find('.sc_item_descr').first().empty();
        } else if ($clone.find('.elementor-widget-text-editor').length > 0) {
            $clone.find('.elementor-widget-text-editor .elementor-widget-container').first().empty();
        }
    }
    
    // Custom CTAs for this section
    if (section.cta) {
        let btn = $clone.find('.sc_button_default .sc_button_text, a.simple_text_link').first();
        if (btn.length) {
            btn.text(section.cta);
        }
    }
    if (section.buttons && Array.isArray(section.buttons)) {
        let btns = $clone.find('.sc_button_default .sc_button_text, a.simple_text_link');
        section.buttons.forEach((text, i) => {
            if (btns.eq(i).length) {
                btns.eq(i).text(text);
            }
        });
    }
}

for (const [pageKey, pageData] of Object.entries(contentData.pages)) {
    const filename = pageKey === 'index' ? 'index.html' : `${pageKey}.html`;
    console.log(`Building ${filename}...`);
    const $ = cheerio.load(baseHtml);
    
    const $mainWrapper = $('div[data-elementor-type="wp-page"] > .elementor-section-wrap');
    if ($mainWrapper.length) {
        $mainWrapper.empty(); 
    } else {
        $('.elementor-top-section').each((i, el) => {
            const $el = $(el);
            const id = $el.attr('data-id');
            if (!['70aaab6f', '67b4187', 'd394f72'].includes(id)) {
                $el.remove();
            }
        });
    }

    // Set SEO
    if (pageData.seo) {
        $('title').text(pageData.seo.title);
        $('meta[name="description"]').attr('content', pageData.seo.metaDesc);
    }
    
    // Add Custom CSS
    if ($('head link[href="assets/css/custom.css"]').length === 0) {
        $('head').append('<link rel="stylesheet" href="assets/css/custom.css">');
    }

    let isFirst = true;
    for (const [sectionKey, section] of Object.entries(pageData)) {
        if (sectionKey === 'seo') continue;


        let $clone;
        if (pageKey === 'faq' && sectionKey === 'hero') {
            // Render hero, then append the FAQ accordion immediately after
            $clone = $heroBlock.clone();
            injectText($clone, section);
            
            // Build FAQ accordion
            let accordionHtml = '<div class="fno-accordion-wrapper" style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">';
            accordionHtml += '<style>.fno-accordion-item { border: 1px solid #d4af37; margin-bottom: 15px; background: #fff; border-radius: 4px;} .fno-accordion-title { padding: 20px; font-weight: bold; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #f4ebd9; color: #0d2b23; font-size: 1.1rem; } .fno-accordion-content { padding: 0 20px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; background: #fff; } .fno-accordion-content p { padding: 20px 0; margin: 0; color: #555; line-height: 1.6; } .fno-accordion-item.active .fno-accordion-content { max-height: 500px; }</style>';
            
            contentData.faq.forEach(item => {
                accordionHtml += `
                    <div class="fno-accordion-item">
                        <div class="fno-accordion-title">${item.q} <span>+</span></div>
                        <div class="fno-accordion-content"><p>${item.a}</p></div>
                    </div>
                `;
            });
            accordionHtml += '</div>';
            
            accordionHtml += `
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
            `;
            
            const $faqSection = $splitBlock.clone();
            $faqSection.find('.elementor-container').html(accordionHtml);
            
            // Clean up static classes for both
            $clone.removeClass('sc_fly_static elementor-invisible trx_addons_invisible');
            $clone.find('.sc_fly_static, .elementor-invisible, .trx_addons_invisible').removeClass('sc_fly_static elementor-invisible trx_addons_invisible');
            $faqSection.removeClass('sc_fly_static elementor-invisible trx_addons_invisible');
            $faqSection.find('.sc_fly_static, .elementor-invisible, .trx_addons_invisible').removeClass('sc_fly_static elementor-invisible trx_addons_invisible');

            $('.elementor-7074').append($clone);
            $('.elementor-7074').append($faqSection);
            
            isFirst = false;
            continue; // Skip the rest of the loop for this section
            
        } else if (sectionKey === 'legalSections') {
            let legalHtml = '<div style="max-width: 1000px; margin: 0 auto; padding: 40px 20px;">';
            section.forEach(sec => {
                legalHtml += `<h2 style="color: #0d2b23; margin-top: 40px; margin-bottom: 20px; border-bottom: 1px solid #d4af37; padding-bottom: 10px;">${sec.title}</h2>`;
                sec.text.forEach(p => {
                    legalHtml += `<p style="margin-bottom: 15px; line-height: 1.6; color: #555;">${p}</p>`;
                });
            });
            legalHtml += '</div>';
            
            $clone = $splitBlock.clone();
            $clone.find('.elementor-container').html(legalHtml);
            // Don't injectText since we completely replaced html
            
        } else if (isFirst || sectionKey === 'hero') {

            $clone = $heroBlock.clone();
            isFirst = false;
        } else if (sectionKey.toLowerCase().includes('why') || sectionKey.toLowerCase().includes('stats') || section.items || Array.isArray(section)) {
            $clone = $featuresBlock.clone();
        } else {
            $clone = $splitBlock.clone();
        }

        injectText($clone, section);
        
        // Remove animation classes that keep elements invisible
        $clone.removeClass('sc_fly_static elementor-invisible trx_addons_invisible');
        $clone.find('.sc_fly_static, .elementor-invisible, .trx_addons_invisible').removeClass('sc_fly_static elementor-invisible trx_addons_invisible');

        // Fix Swiper carousels (clean up pre-initialized state from the static HTML)
        if ($clone.find('.slider_swiper').length > 0) {
            $clone.find('.swiper-initialized').removeClass('swiper-initialized inited swiper-horizontal swiper-pointer-events swiper-backface-hidden');
            $clone.find('.swiper-wrapper').removeAttr('style');
            $clone.find('.swiper-slide').removeAttr('style').removeClass('swiper-slide-active swiper-slide-next swiper-slide-prev swiper-slide-duplicate swiper-slide-duplicate-active swiper-slide-duplicate-next swiper-slide-duplicate-prev');
            $clone.find('.swiper-slide-duplicate').remove();
            
            $clone.find('.slider_swiper').each((i, el) => {
                const newId = 'swiper_' + Math.random().toString(36).substr(2, 9);
                $(el).attr('id', newId);
                $(el).addClass('my-custom-swiper');
            });
        }

        $('div[data-elementor-type="wp-page"]').append($clone);
    }

    // Add Swiper CDN and Init Script if needed
    if ($('.my-custom-swiper').length > 0) {
        if ($('head link[href*="swiper-bundle"]').length === 0) {
            $('head').append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />');
        }
        if ($('body script[src*="swiper-bundle"]').length === 0) {
            $('body').append('<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>');
            $('body').append(`
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        setTimeout(function() {
                            document.querySelectorAll('.my-custom-swiper').forEach(el => {
                                new Swiper(el, {
                                    slidesPerView: 1,
                                    spaceBetween: 30,
                                    loop: true,
                                    breakpoints: {
                                        768: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3 }
                                    },
                                    navigation: {
                                        nextEl: el.closest('.slider_wrap').querySelector('.slider_next'),
                                        prevEl: el.closest('.slider_wrap').querySelector('.slider_prev'),
                                    }
                                });
                            });
                        }, 500); // small delay to ensure DOM is ready
                    });
                </script>
            `);
        }
    }

    // Add FNO Animated Loader
    $('head').append(`
        <style>
            #fno-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 999999;
                display: flex;
                justify-content: center;
                align-items: center;
                pointer-events: none;
                visibility: visible;
                transition: visibility 0s 1.5s;
            }
            #fno-loader.loaded {
                visibility: hidden;
            }
            
            .fno-shutter-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                z-index: 1;
            }
            
            .fno-shutter-blade {
                flex: 1;
                height: 100%;
                background-color: #0d2b23; /* Deep Green */
                transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
                transform-origin: top;
            }
            
            #fno-loader.loaded .fno-shutter-blade {
                transform: scaleY(0); /* or translateY(-100%) for sliding up */
            }
            
            /* Staggered delays for blades to open one by one */
            .fno-shutter-blade:nth-child(1) { transition-delay: 0.30s; }
            .fno-shutter-blade:nth-child(2) { transition-delay: 0.40s; }
            .fno-shutter-blade:nth-child(3) { transition-delay: 0.50s; }
            .fno-shutter-blade:nth-child(4) { transition-delay: 0.60s; }
            .fno-shutter-blade:nth-child(5) { transition-delay: 0.70s; }

            .fno-loader-content {
                position: relative;
                z-index: 2;
                font-family: Arial, sans-serif;
                font-size: 4rem;
                font-weight: 700;
                color: #f4ebd9; /* Ivory */
                letter-spacing: 0.5rem;
                display: flex;
                gap: 15px;
                transition: opacity 0.3s ease-out;
            }
            #fno-loader.loaded .fno-loader-content {
                opacity: 0;
            }
            .fno-letter {
                display: inline-block;
                animation: fno-bounce 1.5s infinite ease-in-out both;
            }
            .fno-letter:nth-child(1) { animation-delay: -0.32s; }
            .fno-letter:nth-child(2) { animation-delay: -0.16s; }
            .fno-letter:nth-child(3) { animation-delay: 0s; }
            
            @keyframes fno-bounce {
                0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
                40% { transform: translateY(-20px); opacity: 1; }
            }
        </style>
    `);
    
    $('body').prepend(`
        <div id="fno-loader">
            <div class="fno-shutter-container">
                <div class="fno-shutter-blade"></div>
                <div class="fno-shutter-blade"></div>
                <div class="fno-shutter-blade"></div>
                <div class="fno-shutter-blade"></div>
                <div class="fno-shutter-blade"></div>
            </div>
            <div class="fno-loader-content">
                <span class="fno-letter">F</span>
                <span class="fno-letter">N</span>
                <span class="fno-letter">O</span>
            </div>
        </div>
        <script>
            window.addEventListener('load', function() {
                // Remove the loader class 'loaded' to trigger the shutter effect
                setTimeout(() => {
                    const loader = document.getElementById('fno-loader');
                    if (loader) loader.classList.add('loaded');
                }, 800); // 800ms delay to show the animation beautifully before opening
            });
        </script>
    `);

    // Ensure email subscription popup is hidden by default
    $('.adp-popup').removeClass('adp-popup-open');

    // Add script to show popup after 8 seconds
    if ($('.adp-popup').length > 0) {
        $('body').append(`
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    // Show popup after 8 seconds
                    setTimeout(function() {
                        document.querySelectorAll('.adp-popup').forEach(p => p.classList.add('adp-popup-open'));
                    }, 8000);

                    // Close popup logic
                    document.querySelectorAll('.adp-popup-close, .adp-popup-overlay').forEach(btn => {
                        btn.addEventListener('click', function(e) {
                            e.preventDefault();
                            this.closest('.adp-popup').classList.remove('adp-popup-open');
                        });
                    });
                });
            </script>
        `);
    }

    
    // Add Footer Disclaimer
    if (contentData.global.footerDisclaimer) {
        $('.sc_layouts_row_type_compact .sc_layouts_column_align_right').first().prepend(
            '<div style="font-size: 0.8rem; line-height: 1.4; color: #888; padding-bottom: 10px; max-width: 600px;">' + contentData.global.footerDisclaimer + '</div>'
        );
    }

    // Update global CTAs
    $('.sc_button_default').each((i, el) => {
        let text = $(el).find('.sc_button_text').text().trim();
        if (text.toLowerCase().includes('read more')) {
            $(el).find('.sc_button_text').text(contentData.global.ctaPrimary || 'Explore Our Vision');
        }
        if (text.toLowerCase().includes('get in touch') || text.toLowerCase().includes('buy tickets')) {
            $(el).find('.sc_button_text').text(contentData.global.ctaSecondary || 'Register Your Interest');
            $(el).attr('href', 'contact-us.html');
        }
    });
// Update navigation links
    $('#menu_main > li').each((i, el) => {
        let text = $(el).find('> a > span').text().trim().toLowerCase();
        if (text === 'home') $(el).find('> a').attr('href', 'index.html');
        if (text === 'pages') $(el).find('> a > span').text('About Us');
        if (text === 'pages') $(el).find('> a').attr('href', 'about-us.html');
        if (text === 'properties') $(el).find('> a > span').text('Upcoming Project');
        if (text === 'properties') $(el).find('> a').attr('href', 'upcoming-project.html');
        if (text === 'blog') $(el).find('> a > span').text('Decoding Destination');
        if (text === 'blog') $(el).find('> a').attr('href', 'decoding-destination-real-estate.html');
        if (text === 'shop') $(el).find('> a > span').text('Contact Us');
        if (text === 'shop') $(el).find('> a').attr('href', 'contact-us.html');
    });

    fs.writeFileSync(path.join(outputDir, filename), $.html());
}

console.log('Build complete!');
