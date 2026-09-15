const fs = require('fs');
const data = JSON.parse(fs.readFileSync('content.json', 'utf8'));

// 1. Update navigation
const nav = data.global.nav;
if (!nav.find(n => n.name === 'FAQs')) {
    nav.push({ name: 'FAQs', url: 'faq.html' });
}
if (!nav.find(n => n.name === 'Legal')) {
    nav.push({ name: 'Legal', url: 'legal.html' });
}

// 2. Add FAQ page to contentData.pages
data.pages['faq'] = {
    seo: {
        title: "FAQs | FNO Global Developers",
        metaDesc: "Find answers to common questions about FNO Global Developers, the upcoming villa community in North of Goa, NH-66 connectivity, early interest, location details and the promoter experience behind the company."
    },
    hero: {
        title: "FAQ Section",
        subtitle: "",
        text: "Frequently Asked Questions about FNO Global Developers and our upcoming projects."
    }
};

// 3. Add Legal page to contentData.pages
data.pages['legal'] = {
    seo: {
        title: "Legal and Publishing Notes | FNO Global Developers",
        metaDesc: "Legal and publishing notes for FNO Global Developers and its associated projects."
    },
    hero: {
        title: "Legal and Publishing Notes",
        subtitle: "Important Copy Safety and Public Reference Notes",
        text: "These sources were used only to support market insight and regional context. They should be treated as reference notes, not as direct sales promises."
    },
    legalSections: [
        {
            title: "Important Copy Safety Notes",
            text: [
                "• Do not claim guaranteed returns, assured appreciation or fixed rental income.",
                "• Do not publish exact project specifications until confirmed by the developer team.",
                "• Do not use 'India's lowest AQI zones' unless supported by a current official source.",
                "• Keep Luxe Heaven Villas marked as sold out if shown on the website.",
                "• Use 'North of Goa' consistently in project-facing website copy.",
                "• Use Sindhudurg or Malvan-Tarkarli references only as wider regional/lifestyle context, not as the main project location.",
                "• Final website should be reviewed for RERA/regulatory requirements before publishing live project sales content."
            ]
        },
        {
            title: "Public Reference Notes",
            text: [
                "<b>Goa tourism arrivals, January-July 2026</b><br>ETTravelWorld reported that Goa recorded 61.38 lakh tourist arrivals between January and July 2026, with domestic and international visitor numbers noted in the report. <br><a href='https://travel.economictimes.indiatimes.com/news/destination/states/goa-records-6-14-million-tourist-arrivals-in-first-seven-months-of-2026/133291079' target='_blank'>Source</a>",
                "<b>Goa year-round and experience-led tourism</b><br>Times of India described Goa's tourism brand as moving beyond beaches into cuisine, adventure, boutique stays, wellness, weddings and conferences.<br><a href='https://timesofindia.indiatimes.com/life-style/travel/whats-new-in-goa-beyond-its-beaches-discover-the-fresh-face-of-this-touristy-city/articleshow/124310431.cms' target='_blank'>Source</a>",
                "<b>Taj hotel update in wider coastal belt</b><br>Times of India reported a tripartite agreement for a Taj hotel at Shiroda-Velaghar in Sindhudurg involving IHCL, MTDC and local landholders' representatives.<br><a href='https://timesofindia.indiatimes.com/city/mumbai/tripartite-agreement-signed-for-taj-hotel-in-sindhudurg/articleshow/133330423.cms' target='_blank'>Source</a>",
                "<b>Tarkarli water sports and coastal experiences</b><br>Maharashtra Tourism describes Tarkarli Beach as a destination for boating, kayaking, paddleboarding, scuba diving and snorkeling.<br><a href='https://maharashtratourism.gov.in/beach/tarkarli/' target='_blank'>Source</a>",
                "<b>Malvan Marine Sanctuary</b><br>Maharashtra Tourism notes Malvan Marine Sanctuary and the coastal area's marine biodiversity and scuba-diving appeal.<br><a href='https://maharashtratourism.gov.in/districts/sindhudurg/' target='_blank'>Source</a>",
                "<b>Goa AQI context</b><br>Times of India reported GSPCB statements about Goa air quality remaining good to satisfactory for most of April 2025-March 2026, while also noting local variations in some areas.<br><a href='https://timesofindia.indiatimes.com/city/goa/goa-air-quality-good-water-pollution-a-concern-gspcb/amp_articleshow/131540102.cms' target='_blank'>Source</a>"
            ]
        }
    ]
};

// Write it back
fs.writeFileSync('content.json', JSON.stringify(data, null, 2));
console.log('Updated content.json successfully.');
