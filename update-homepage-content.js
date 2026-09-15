const fs = require('fs');
const contentData = JSON.parse(fs.readFileSync('content.json', 'utf8'));

contentData.pages.index = {
    seo: contentData.pages.index.seo,
    hero: {
        title: "FNO Global Developers",
        subtitle: "Focused Nationwide Opportunities",
        description: "Premium Real Estate Destinations, Built with Vision and Experience",
        text: "FNO Global Developers is a new-age real estate development company founded in 2025. The brand is young, but the experience behind it is strong. Our promoters bring nearly four decades of understanding in real estate, luxury construction, business, investments and long-term value creation. We focus on identifying promising locations and shaping them into premium real estate destinations with better planning, stronger lifestyle appeal and a future-ready vision.",
        bottomLine: "Luxury. Location. Legacy.",
        primaryCTA: "Explore Our Vision",
        secondaryCTA: "Register Your Interest"
    },
    intro: {
        title: "A New Brand Backed by Four Decades of Real Estate Experience",
        text: [
            "Real estate is not built only with land and structure. It is built with timing, location understanding, construction quality, trust and a clear vision for the future.",
            "FNO Global Developers was created with this belief.",
            "Started in 2025, the company brings together modern business thinking and decades of promoter experience. Our leadership has worked across real estate, luxury construction, investments and international client markets. This gives us a balanced approach: fresh ideas supported by real-world experience.",
            "Our aim is to create developments that feel premium, practical and meaningful for the people who live in them, invest in them and associate with them."
        ]
    },
    whyChoose: {
        title: "Why Choose FNO Global Developers",
        items: [
            {
                title: "Four Decades of Promoter Experience",
                desc: "Our promoters bring nearly four decades of experience in real estate, construction and business. This helps us understand what makes a location strong, what buyers expect and how a project should be planned for lasting value."
            },
            {
                title: "Premium Location Selection",
                desc: "We focus on locations that offer lifestyle value, connectivity and future relevance. For us, location is not just an address. It is the foundation of every project."
            },
            {
                title: "Luxury with Real Meaning",
                desc: "Luxury is not only about expensive finishes. It is about space, privacy, comfort, thoughtful design, quality materials and details that make everyday living better."
            },
            {
                title: "Destination-Led Thinking",
                desc: "We look at real estate as a destination story. A good project should be connected, liveable, well-planned and aligned with the way people want to live in the future."
            },
            {
                title: "Clear and Responsible Communication",
                desc: "We believe buyers deserve clarity. Project details, updates and next steps should be communicated in a simple and transparent way."
            }
        ]
    },
    leadership: {
        title: "Promoters and Leadership Snapshot",
        subtitle: "Led by Experience. Driven by a New Vision.",
        text: "FNO Global Developers was founded in 2025, but the strength behind the company comes from promoters with nearly four decades of experience in real estate, luxury construction, investments, business growth and international client markets.\nThe leadership team brings together two strong generations: experienced promoters who understand real estate from the ground level, and young entrepreneurs who bring modern thinking, global exposure and a future-focused approach.",
        list: [
            "Kunal Arora — Founder & Managing Director",
            "Spice Bindal — Founder & Managing Director",
            "Jugal Arora — Founder & Chairman",
            "Suman Bindal — Founder & Chairman"
        ],
        cta: "Meet Our Promoters"
    },
    marketInsight: {
        title: "Why North of Goa Is Getting Stronger Attention",
        text: [
            "Goa is no longer only a peak-season holiday market. It is moving towards year-round travel, wellness, workation, heritage, gastronomy, MICE, adventure and experience-led tourism. Recent tourism updates reported 61.38 lakh tourist arrivals between January and July 2026, including strong domestic travel and continued international interest.",
            "This matters for real estate because buyers are looking at Goa differently now. Many are exploring second homes, private villa stays, work-from-anywhere spaces, wellness-led living and premium lifestyle addresses.",
            "For FNO Global Developers, this shift supports our focus on North of Goa: a location direction where lifestyle, access, nature and future demand can come together."
        ]
    },
    upcomingProject: {
        title: "Coming Soon in North of Goa",
        subtitle: "A Premium Villa Community with Direct NH-66 Connectivity",
        text: [
            "FNO Global Developers is preparing to introduce a premium villa community in North of Goa, located opposite Aradhya Cinema with direct NH-66 connectivity.",
            "This upcoming project is being planned for buyers who want more than just a property. It is for people who value space, privacy, natural surroundings, easier access and a refined lifestyle experience.",
            "For now, the project page should remain focused on the location, the coming-soon status, the brand vision and early-interest registration."
        ],
        list: [
            "Project Status: Coming Soon",
            "Location: Opposite Aradhya Cinema, North of Goa, NH-66",
            "Project Type: Premium Villa Community"
        ],
        cta: "Register Early Interest"
    },
    lifestyle: {
        title: "A Location Connected to Nature, Travel and Experiences",
        text: [
            "North of Goa offers a rare mix of calm living, road connectivity, tourism movement and access to coastal experiences. The larger coastal belt around Goa also has a growing experience-led travel identity, with destinations such as Malvan and Tarkarli known for water sports, scuba diving and coastal adventure.",
            "There is also new hospitality movement in the wider coastal belt, including a proposed Taj hotel project at Shiroda-Velaghar in Sindhudurg. Such updates show that the larger Goa-Konkan region is receiving attention for premium tourism and hospitality infrastructure."
        ]
    },
    cleanEnvironment: {
        title: "Cleaner Surroundings. Calmer Living.",
        text: [
            "For many buyers from crowded cities, a home in Goa is not only about holidays. It is about breathing easier, living slower and finding a better everyday rhythm.",
            "Goa’s cleaner coastal environment, open surroundings and slower pace continue to make it attractive for lifestyle-led living."
        ]
    },
    portfolio: {
        title: "Our Completed Luxury Villa Work",
        subtitle: "Luxe Heaven Villas – Porvorim, North of Goa",
        list: ["Status: Sold Out"],
        text: [
            "Luxe Heaven Villas is one of our earlier luxury villa developments in Porvorim, North of Goa. Designed with European-inspired elegance and a Goan lifestyle touch, the project reflected our focus on privacy, comfort, detailing and premium living.",
            "The project included ultra-luxury fully furnished villas with modern bedrooms, private lift, swimming pool, terrace entertainment spaces, premium fittings, home theatre, smart security and fully loaded lifestyle features."
        ]
    },
    finalCta: {
        title: "Be Among the First to Know",
        text: "A premium villa community is coming soon in North of Goa. Register your interest today to receive project updates, location details, private preview information and launch communication from FNO Global Developers.",
        buttons: [
            "Register Your Interest",
            "Speak With Our Team"
        ]
    }
};

fs.writeFileSync('content.json', JSON.stringify(contentData, null, 2));
console.log('Updated content.json with new homepage content.');
