export type VerificationState = "verified" | "provisional" | "awaiting approval";

export const hotelProfile = {
  name: "SouthSide Hotel and Suites",
  location: "Winners Street, Abraka, Delta State, Nigeria",
  phone: "+234 705 562 8339",
  email: "Hotelsouthside@gmail.com",
  timezone: "Africa/Lagos",
  currency: "NGN",
  verification: "verified" as VerificationState,
  social: {
    instagram: "https://www.instagram.com/southside_hotel/?hl=en",
    tiktok: "https://www.tiktok.com/@southside.hotel.abraka",
    website: "https://www.southsidehotelandsuites.com/",
    maps: "https://www.google.com/maps/search/SouthSide+Hotel+and+Suites+Abraka+Delta+State+Nigeria",
    snapchat: "https://www.snapchat.com/place/southsidehotelandsuitesabraka/daf89268-aa35-11f0-aa3d-171979d6f4a6",
    whatsapp: "https://wa.me/2347055628339?text=Hello%20SouthSide%20Hotel%20and%20Suites.%20I%20would%20like%20to%20make%20an%20enquiry%20about%20accommodation.",
  },
};

export const hotelMedia = [
  { src: "/manus-storage/southside-hotel_4ed40881.jpg", alt: "SouthSide Hotel and Suites glowing at night in Abraka", label: "SouthSide after dark", detail: "", source: "https://www.instagram.com/reel/C8W5KW8Nw4E/", variant: "ink" as const },
  { src: "/manus-storage/southside-stay_ce1215c9.jpg", alt: "SouthSide interior with artwork and a television", label: "A room to settle into", detail: "", source: "https://www.instagram.com/p/DX-SphpDfKG/", variant: "moss" as const },
  { src: "/manus-storage/southside-tour_c1a0bee6.jpg", alt: "SouthSide Hotel and Suites exterior in Abraka", label: "The SouthSide arrival", detail: "", source: "https://www.instagram.com/reel/DMfVzISNlkD/", variant: "copper" as const },
  { src: "/manus-storage/southside-classic_e037045c.jpg", alt: "SouthSide bathroom with a rainfall shower", label: "Room details", detail: "", source: "https://www.instagram.com/reel/DdFP69HtWUR/", variant: "moss" as const },
] as const;

export const hotelVideo = {
  src: "/manus-storage/southside-tour_c48569e3.mp4",
  poster: "/manus-storage/southside-tour_c1a0bee6.jpg",
  alt: "SouthSide Hotel and Suites tour in Abraka",
  source: "https://www.instagram.com/reel/DMfVzISNlkD/",
} as const;

const representative = {
  classic: { image: hotelMedia[1].src, imageAlt: hotelMedia[1].alt, imageDetail: "", media: [{ src: hotelMedia[1].src, alt: hotelMedia[1].alt, label: "Room interior" }, { src: hotelMedia[3].src, alt: hotelMedia[3].alt, label: "Bathroom details" }] as const },
  royal: { image: hotelMedia[1].src, imageAlt: hotelMedia[1].alt, imageDetail: "", media: [{ src: hotelMedia[1].src, alt: hotelMedia[1].alt, label: "Room interior" }] as const },
  superior: { image: hotelMedia[1].src, imageAlt: hotelMedia[1].alt, imageDetail: "", media: [{ src: hotelMedia[1].src, alt: hotelMedia[1].alt, label: "Room interior" }] as const },
  luxury205: { image: hotelMedia[1].src, imageAlt: hotelMedia[1].alt, imageDetail: "", media: [{ src: hotelMedia[1].src, alt: hotelMedia[1].alt, label: "Room interior" }] as const },
  luxury208: { image: hotelMedia[1].src, imageAlt: hotelMedia[1].alt, imageDetail: "", media: [{ src: hotelMedia[1].src, alt: hotelMedia[1].alt, label: "Room interior" }] as const },
  premium306: { image: hotelMedia[1].src, imageAlt: hotelMedia[1].alt, imageDetail: "", media: [{ src: hotelMedia[1].src, alt: hotelMedia[1].alt, label: "Room interior" }] as const },
  premium308: { image: hotelMedia[1].src, imageAlt: hotelMedia[1].alt, imageDetail: "", media: [{ src: hotelMedia[1].src, alt: hotelMedia[1].alt, label: "Room interior" }] as const },
  executive: { image: hotelMedia[1].src, imageAlt: hotelMedia[1].alt, imageDetail: "", media: [{ src: hotelMedia[1].src, alt: hotelMedia[1].alt, label: "Room interior" }] as const },
} as const;

export const provisionalRooms = [
  { slug: "classic-room", name: "Classic Room", lead: "A calm room for an easy stay in Abraka.", description: "The Classic Room is the practical starting point for a SouthSide stay, with a confirmed rate of ₦55,000 per night.", amount: 55000, evidence: "SouthSide room catalogue", verification: "verified" as VerificationState, ...representative.classic, amenities: ["Comfortable room setting", "Direct hotel enquiry"] },
  { slug: "royal-suite", name: "Royal Suite", lead: "More space for longer visits and slower mornings.", description: "The Royal Suite offers a generous SouthSide stay at a confirmed rate of ₦65,000 per night.", amount: 65000, evidence: "SouthSide room catalogue", verification: "verified" as VerificationState, ...representative.royal, amenities: ["Suite setting", "Direct hotel enquiry"] },
  { slug: "superior-suite", name: "Superior Suite", lead: "A suite choice for guests who want a little more room.", description: "The Superior Suite gives guests another way to shape a SouthSide stay at ₦65,000 per night.", amount: 65000, evidence: "SouthSide room catalogue", verification: "verified" as VerificationState, ...representative.superior, amenities: ["Suite setting", "Direct hotel enquiry"] },
  { slug: "luxury-room-205", name: "Luxury Room 205", lead: "A refined room choice for a focused stay.", description: "Luxury Room 205 is available in the SouthSide room catalogue at ₦75,000 per night.", amount: 75000, evidence: "SouthSide room catalogue", verification: "verified" as VerificationState, ...representative.luxury205, amenities: ["Refined room setting", "Direct hotel enquiry"] },
  { slug: "luxury-room-208", name: "Luxury Room 208", lead: "A polished room for evenings in Abraka.", description: "Luxury Room 208 is a polished SouthSide room choice at ₦75,000 per night.", amount: 75000, evidence: "SouthSide room catalogue", verification: "verified" as VerificationState, ...representative.luxury208, amenities: ["Refined room setting", "Direct hotel enquiry"] },
  { slug: "premium-room-306", name: "Premium Room 306", lead: "A premium room for guests who value a composed stay.", description: "Premium Room 306 offers a composed SouthSide stay at ₦95,000 per night.", amount: 95000, evidence: "SouthSide room catalogue", verification: "verified" as VerificationState, ...representative.premium306, amenities: ["Premium room setting", "Direct hotel enquiry"] },
  { slug: "premium-room-308", name: "Premium Room 308", lead: "A premium room for a more considered visit.", description: "Premium Room 308 offers a considered SouthSide stay at ₦95,000 per night.", amount: 95000, evidence: "SouthSide room catalogue", verification: "verified" as VerificationState, ...representative.premium308, amenities: ["Premium room setting", "Direct hotel enquiry"] },
  { slug: "executive-accommodation", name: "Executive Accommodation", lead: "A comfortable base for work and longer days.", description: "Executive Accommodation gives guests a practical SouthSide base at ₦105,000 per night.", amount: 105000, evidence: "SouthSide room catalogue", verification: "verified" as VerificationState, ...representative.executive, amenities: ["Executive stay setting", "Direct hotel enquiry"] },
] as const;

export const facilityLeads = [
  { title: "Reception and arrival", copy: "Begin your stay with a direct welcome and a clear route to your room." },
  { title: "Gym", copy: "The hotel presents a gym in its official social content. Ask the team about equipment and access during your stay." },
  { title: "Food and dining", copy: "Food and kitchen scenes feature in official SouthSide content. Ask the hotel about the current dining format." },
  { title: "Lounge", copy: "A lounge atmosphere is part of the SouthSide story. Ask the hotel about current hours and guest access." },
  { title: "Events", copy: "SouthSide shares event-related scenes for guests planning gatherings. Speak with the hotel about the available setting." },
  { title: "Rooms and suites", copy: "Choose from a catalogue of rooms and suites, then speak with the hotel about the right fit for your dates." },
];

export const destinationLeads = [
  { name: "McCarthy Beach", status: "Plausible local lead", copy: "A public Delta State tourism reference names McCarthy Beach in Abraka. Confirm access, safety, opening arrangements, and current condition locally before visiting.", source: "https://www.facebook.com/DSGovernment/videos/delta-state-continues-to-highlight-its-natural-attractions-as-part-of-a-broader/1885024915428204/" },
  { name: "River Ethiope", status: "Regional nature lead", copy: "River Ethiope is widely described in public travel and academic references as a Delta State natural feature associated with communities around Abraka. Ask the hotel for current local guidance rather than relying on an unverified distance or itinerary.", source: "https://www.worldscholars.org/index.php/jss/article/view/528" },
  { name: "Abraka and DELSU", status: "Local context", copy: "Abraka is home to Delta State University’s Abraka campus. Use the hotel as a base for local visits, and ask the team for current directions and event-day advice.", source: "https://www.delsu.edu.ng/" },
  { name: "Park Vega Waterpark", status: "Day-trip lead", copy: "Park Vega is publicly promoted in Delta State travel content in Agbor. It is not in Abraka, so confirm travel time, operating dates, and tickets independently before planning a visit.", source: "https://www.tripadvisor.com/Attractions-g3652170-Activities-c42-Delta_State.html" },
];

export const attributedReviews = [
  { quote: "Nice place to visit", author: "Guest reviewer", age: "3 weeks ago", source: "Wanderboat", url: "https://wanderboat.ai/hotels/nigeria/delta-state/southside-hotel-and-suites-abraka/nGMoPYm-TRmYayeo4URfVw" },
  { quote: "The receptionist are nice, thier services are top notch... Will love to visit again", author: "Guest reviewer", age: "2 years ago", source: "Wanderboat", url: "https://wanderboat.ai/hotels/nigeria/delta-state/southside-hotel-and-suites-abraka/nGMoPYm-TRmYayeo4URfVw" },
  { quote: "They have Cool room, a nice restaurant, a nice bathroom and so many others", author: "Guest reviewer", age: "25 weeks ago", source: "Wanderboat", url: "https://wanderboat.ai/hotels/nigeria/delta-state/southside-hotel-and-suites-abraka/nGMoPYm-TRmYayeo4URfVw" },
];

export const publicSourceLinks = [
  { label: "SouthSide Instagram", url: hotelProfile.social.instagram, note: "Rooms, arrival, food, and stay content from SouthSide." },
  { label: "SouthSide TikTok", url: hotelProfile.social.tiktok, note: "Tours and room content from SouthSide in Abraka." },
  { label: "Google Maps listing", url: hotelProfile.social.maps, note: "A route and place reference for guests; ratings and user media can change." },
  { label: "SouthSide website", url: hotelProfile.social.website, note: "The hotel web address used in public listings; confirm live details with the hotel." },
];

export const faqItems = [
  { question: "Where is SouthSide Hotel and Suites located?", answer: "SouthSide Hotel and Suites is on Winners Street in Abraka, Delta State, Nigeria. Call the hotel for the best directions from your starting point." },
  { question: "How can I make a reservation?", answer: "Use the booking page to begin with your dates, guests, and preferred room. You can also call or WhatsApp the hotel for a direct enquiry." },
  { question: "What are the room rates?", answer: "Confirmed nightly rates are listed on each room page. Contact the hotel to plan your dates and preferred room." },
  { question: "What facilities are available?", answer: "SouthSide presents reception, rooms, a gym, lounge, food, and event-related spaces. Ask the hotel about current access, hours, and arrangements." },
  { question: "What are the check-in and check-out times?", answer: "Call the hotel before your arrival for the current check-in and check-out times." },
  { question: "What payment methods are accepted?", answer: "Ask the hotel which payment method is best for your reservation and dates." },
];

export const pendingApprovals = [
  "Confirm the current room catalogue and inventory before selling online.",
  "Confirm street wording, guest policies, and arrival details.",
  "Confirm written permission for each hotel-supplied social image before launch.",
  "Confirm payment, email, and notification credentials and test them end to end.",
];
