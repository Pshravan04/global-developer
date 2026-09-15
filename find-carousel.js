const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('residency-showcase/index.html', 'utf8');
const $ = cheerio.load(html);
$('.elementor-widget-image-carousel').each((i, el) => {
    console.log('Found carousel in section: ' + $(el).closest('.elementor-section').attr('data-id'));
});
$('.elementor-widget-testimonial-carousel').each((i, el) => {
    console.log('Found testimonial carousel in section: ' + $(el).closest('.elementor-section').attr('data-id'));
});
// also check for swiper-container
$('.swiper-container, .swiper').each((i, el) => {
    console.log('Found swiper in section: ' + $(el).closest('.elementor-section').attr('data-id'));
});
