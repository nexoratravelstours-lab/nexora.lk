/**
 * NEXORA Travels and Tours (Pvt) Ltd
 * Centralized Destinations Configuration
 * 
 * Update or add countries easily from this file.
 */

const SCHENGEN_DESTINATIONS = [
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    featuredLocation: "Berlin",
    description: "Discover Germany's historic landmarks, vibrant cities, cultural attractions, and memorable travel experiences.",
    image: "assets/images/destinations/germany.jpg",
    cta: "Germany Visit Visa Assistance",
    region: "western",
    category: "Central & Western Europe",
    highlights: ["Brandenburg Gate", "Museum Island", "Bavarian Alps", "Rhine Valley"],
    processingTime: "Approx. 15 working days",
    currency: "EUR (€)",
    officialEmbassyInfo: "Embassy of the Federal Republic of Germany, Colombo",
    coords: { lat: 52.5200, lon: 13.4050 }
  },
  {
    id: "austria",
    name: "Austria",
    flag: "🇦🇹",
    featuredLocation: "Vienna",
    description: "Explore Austria's elegant architecture, historic streets, beautiful scenery, and rich cultural heritage.",
    image: "assets/images/destinations/austria.jpg",
    cta: "Austria Visit Visa Assistance",
    region: "western",
    category: "Central Europe",
    highlights: ["Schönbrunn Palace", "Vienna State Opera", "Hallstatt", "Salzburg Old Town"],
    processingTime: "Approx. 15 working days",
    currency: "EUR (€)",
    officialEmbassyInfo: "Austrian representation through VFS Global / German Embassy",
    coords: { lat: 48.2082, lon: 16.3738 }
  },
  {
    id: "croatia",
    name: "Croatia",
    flag: "🇭🇷",
    featuredLocation: "Dubrovnik",
    description: "Experience Croatia's beautiful Adriatic coastline, historic towns, and remarkable coastal scenery.",
    image: "assets/images/destinations/croatia.jpg",
    cta: "Croatia Visit Visa Assistance",
    region: "southern",
    category: "Southern Europe & Mediterranean",
    highlights: ["Dubrovnik Old Town Walls", "Plitvice Lakes", "Split Diocletian's Palace", "Hvar Island"],
    processingTime: "Approx. 15-20 working days",
    currency: "EUR (€)",
    officialEmbassyInfo: "Croatian Consular representations via accredited partner missions",
    coords: { lat: 42.6507, lon: 18.0944 }
  },
  {
    id: "malta",
    name: "Malta",
    flag: "🇲🇹",
    featuredLocation: "Valletta",
    description: "Discover Malta's Mediterranean atmosphere, historic architecture, coastal scenery, and cultural attractions.",
    image: "assets/images/destinations/malta.jpg",
    cta: "Malta Visit Visa Assistance",
    region: "southern",
    category: "Mediterranean Island",
    highlights: ["St. John's Co-Cathedral", "Grand Harbour", "Mdina Silent City", "Blue Lagoon Comino"],
    processingTime: "Approx. 15 working days",
    currency: "EUR (€)",
    officialEmbassyInfo: "Central Visa Unit Malta / Italian or accredited mission representation",
    coords: { lat: 35.8989, lon: 14.5146 }
  },
  {
    id: "norway",
    name: "Norway",
    flag: "🇳🇴",
    featuredLocation: "Norwegian fjords",
    description: "Explore Norway's spectacular fjords, scenic landscapes, waterfront cities, and unforgettable natural beauty.",
    image: "assets/images/destinations/norway.jpg",
    cta: "Norway Visit Visa Assistance",
    region: "nordic",
    category: "Nordic & Scandinavia",
    highlights: ["Geirangerfjord & Nærøyfjord", "Bergen Bryggen", "Oslo Opera House", "Northern Lights Tromsø"],
    processingTime: "Approx. 15 working days",
    currency: "NOK (Norwegian Krone)",
    officialEmbassyInfo: "Royal Norwegian Embassy accredited processing center",
    coords: { lat: 60.3913, lon: 5.3221 }
  },
  {
    id: "sweden",
    name: "Sweden",
    flag: "🇸🇪",
    featuredLocation: "Stockholm",
    description: "Discover Sweden's waterfront capital, Scandinavian design, historic districts, and beautiful natural surroundings.",
    image: "assets/images/destinations/sweden.jpg",
    cta: "Sweden Visit Visa Assistance",
    region: "nordic",
    category: "Nordic & Scandinavia",
    highlights: ["Gamla Stan Waterfront", "Vasa Museum", "Stockholm Archipelago", "Drottningholm Palace"],
    processingTime: "Approx. 15 working days",
    currency: "SEK (Swedish Krona)",
    officialEmbassyInfo: "Embassy of Sweden accredited partner processing",
    coords: { lat: 59.3293, lon: 18.0686 }
  },
  {
    id: "greece",
    name: "Greece",
    flag: "🇬🇷",
    featuredLocation: "Santorini",
    description: "Experience Greece's beautiful islands, historic landmarks, Mediterranean culture, and scenic coastal destinations.",
    image: "assets/images/destinations/greece.jpg",
    cta: "Greece Visit Visa Assistance",
    region: "southern",
    category: "Southern Europe & Mediterranean",
    highlights: ["Oia Santorini Caldera", "Acropolis of Athens", "Mykonos Windmills", "Crete Palace of Knossos"],
    processingTime: "Approx. 15 working days",
    currency: "EUR (€)",
    officialEmbassyInfo: "Embassy of Greece accredited consular processing",
    coords: { lat: 36.3932, lon: 25.4615 }
  },
  {
    id: "italy",
    name: "Italy",
    flag: "🇮🇹",
    featuredLocation: "Rome",
    description: "Explore Italy's historic monuments, celebrated architecture, artistic heritage, and famous culinary traditions.",
    image: "assets/images/destinations/italy.jpg",
    cta: "Italy Visit Visa Assistance",
    region: "southern",
    category: "Southern Europe",
    highlights: ["Colosseum & Roman Forum", "Vatican City & St. Peter's", "Florence Duomo", "Venice Canals"],
    processingTime: "Approx. 15-20 working days",
    currency: "EUR (€)",
    officialEmbassyInfo: "Embassy of Italy in Colombo / VFS Global Italy",
    coords: { lat: 41.9028, lon: 12.4964 }
  },
  {
    id: "spain",
    name: "Spain",
    flag: "🇪🇸",
    featuredLocation: "Barcelona",
    description: "Discover Spain's vibrant cities, distinctive architecture, beautiful coastlines, and lively cultural experiences.",
    image: "assets/images/destinations/spain.jpg",
    cta: "Spain Visit Visa Assistance",
    region: "southern",
    category: "Southern Europe",
    highlights: ["Sagrada Família", "Park Güell", "Madrid Royal Palace", "Seville Plaza de España"],
    processingTime: "Approx. 15 working days",
    currency: "EUR (€)",
    officialEmbassyInfo: "Embassy of Spain / BLS International Visa Application Center",
    coords: { lat: 41.3851, lon: 2.1734 }
  }
];

const COMPANY_DETAILS = {
  name: "NEXORA Travels and Tours (Pvt) Ltd",
  tagline: "Dreams Take Flight with Nexora",
  email: "nexoratravels.tours@gmail.com",
  phone: "+94 77 050 0639",
  phoneClean: "+94770500639",
  whatsappNumber: "+94770500639",
  address: "No. 1G, Charles Place, Dehiwala, Sri Lanka",
  businessHours: "Monday - Friday: 9:00 AM - 5:00 PM",
  serviceCategory: "SCHENGEN VISIT VISA ASSISTANCE",
  headline: "Your European Journey Starts with NEXORA",
  disclaimer: "Legal & Regulatory Notice: NEXORA Travels and Tours (Pvt) Ltd provides non-governmental visa consultancy, application dossier preparation, and travel documentation advisory services. We are not an embassy, consulate, or official immigration authority. The final decision to grant or decline any visa rests exclusively with the sovereign immigration and consular authorities of the respective destination country. NEXORA does not and cannot guarantee visa approvals."
};

// Make available globally in browser
if (typeof window !== "undefined") {
  window.SCHENGEN_DESTINATIONS = SCHENGEN_DESTINATIONS;
  window.COMPANY_DETAILS = COMPANY_DETAILS;
}
