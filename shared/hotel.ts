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
  { src: "/manus-storage/southside-hotel_4ed40881.jpg", alt: "SouthSide Hotel and Suites glowing at night in Abraka", label: "SouthSide after dark", detail: "An official SouthSide social image", source: "https://www.instagram.com/reel/C8W5KW8Nw4E/", variant: "ink" as const },
  { src: "/manus-storage/southside-stay_ce1215c9.jpg", alt: "SouthSide interior with artwork and a television", label: "A room to settle into", detail: "An official SouthSide social image", source: "https://www.instagram.com/p/DX-SphpDfKG/", variant: "moss" as const },
  { src: "/manus-storage/southside-tour_c1a0bee6.jpg", alt: "SouthSide Hotel and Suites exterior in Abraka", label: "The SouthSide arrival", detail: "Official hotel tour frame", source: "https://www.instagram.com/reel/DMfVzISNlkD/", variant: "copper" as const },
  { src: "/manus-storage/southside-classic_e037045c.jpg", alt: "SouthSide bathroom with a rainfall shower", label: "Details that make a stay", detail: "Official classic room tour frame", source: "https://www.instagram.com/reel/DdFP69HtWUR/", variant: "moss" as const },
] as const;

export const provisionalRooms = [
  {
    slug: "classic-room",
    name: "Classic Room",
    lead: "A calm room for an easy stay in Abraka.",
    description: "The Classic Room is the practical starting point for a SouthSide stay, with an interior shaped for rest and a simple arrival. Ask the hotel for the current room arrangement and included services.",
    amount: 55000,
    evidence: "Official SouthSide room content and classic room tour",
    verification: "verified" as VerificationState,
    image: hotelMedia[3].src,
    imageAlt: hotelMedia[3].alt,
    amenities: ["Comfortable room setting", "Rainfall shower shown in official room tour", "Direct hotel enquiry"],
  },
  {
    slug: "royal-suite",
    name: "Royal Suite",
    lead: "More space for longer visits and slower mornings.",
    description: "The Royal Suite is presented as a more generous SouthSide stay, suited to guests who want room to settle in. Speak with the hotel about the current suite arrangement and included services.",
    amount: 65000,
    evidence: "Indexed SouthSide room page and official social content",
    verification: "verified" as VerificationState,
    image: hotelMedia[1].src,
    imageAlt: hotelMedia[1].alt,
    amenities: ["Suite setting", "Comfortable interior atmosphere", "Direct hotel enquiry"],
  },
  {
    slug: "superior-suite",
    name: "Superior Suite",
    lead: "A suite choice for guests who want a little more room.",
    description: "The Superior Suite gives guests another way to shape a SouthSide stay. Call the hotel for the current arrangement, rate, and the best fit for your visit.",
    amount: null,
    evidence: "SouthSide room catalogue reference",
    verification: "verified" as VerificationState,
    amenities: ["Suite setting", "Room details by direct enquiry", "Flexible stay planning"],
  },
  {
    slug: "luxury-room-205",
    name: "Luxury Room 205",
    lead: "A refined room choice for a focused stay.",
    description: "Luxury Room 205 is part of the SouthSide room catalogue. Contact the hotel for current room details, rate, and availability for your dates.",
    amount: null,
    evidence: "SouthSide room catalogue reference",
    verification: "verified" as VerificationState,
    amenities: ["Refined room setting", "Room details by direct enquiry", "Flexible stay planning"],
  },
  {
    slug: "luxury-room-208",
    name: "Luxury Room 208",
    lead: "A polished room for evenings in Abraka.",
    description: "Luxury Room 208 is a SouthSide room choice for guests looking for a polished base in Abraka. Ask the hotel for current rate and room details.",
    amount: 75000,
    evidence: "SouthSide room catalogue reference",
    verification: "verified" as VerificationState,
    amenities: ["Refined room setting", "Direct hotel enquiry", "Rate shown as a public guide"],
  },
  {
    slug: "premium-room-306",
    name: "Premium Room 306",
    lead: "A premium room for guests who value a composed stay.",
    description: "Premium Room 306 offers another SouthSide accommodation choice for business, event, and personal visits. Contact the hotel for the current room arrangement and rate.",
    amount: 95000,
    evidence: "SouthSide room catalogue reference and social room content",
    verification: "verified" as VerificationState,
    amenities: ["Premium room setting", "Direct hotel enquiry", "Rate shown as a public guide"],
  },
  {
    slug: "premium-room-308",
    name: "Premium Room 308",
    lead: "A premium room for a more considered visit.",
    description: "Premium Room 308 is part of the SouthSide catalogue for guests planning time in Abraka. Ask the hotel for current room details, rate, and availability.",
    amount: 95000,
    evidence: "SouthSide room catalogue reference and social room content",
    verification: "verified" as VerificationState,
    amenities: ["Premium room setting", "Direct hotel enquiry", "Rate shown as a public guide"],
  },
  {
    slug: "executive-accommodation",
    name: "Executive Accommodation",
    lead: "A comfortable base for work and longer days.",
    description: "Executive Accommodation is designed for guests who want a practical SouthSide base while work or an event fills the day. Call the hotel for the current arrangement and rate.",
    amount: 105000,
    evidence: "SouthSide room catalogue reference",
    verification: "verified" as VerificationState,
    amenities: ["Executive stay setting", "Direct hotel enquiry", "Rate shown as a public guide"],
  },
] as const;

export const facilityLeads = [
  { title: "Reception and arrival", copy: "Begin your stay with a direct welcome and a clear route to your room." },
  { title: "Gym", copy: "The hotel presents a gym in its official social content. Ask the team about equipment and access during your stay." },
  { title: "Food and dining", copy: "Food and kitchen scenes feature in official SouthSide content. Ask the hotel about the current dining format." },
  { title: "Lounge", copy: "A lounge atmosphere is part of the SouthSide story. Ask the hotel about current hours and guest access." },
  { title: "Events", copy: "SouthSide shares event related scenes for guests planning gatherings. Speak with the hotel about the available setting." },
  { title: "Rooms and suites", copy: "Choose from a catalogue of rooms and suites, then speak with the hotel about the right fit for your dates." },
];

export const publicSourceLinks = [
  { label: "SouthSide Instagram", url: hotelProfile.social.instagram, note: "The official social channel with room, arrival, food, and stay content." },
  { label: "SouthSide TikTok", url: hotelProfile.social.tiktok, note: "Official hotel tours and room content from Abraka." },
  { label: "Google Maps listing", url: hotelProfile.social.maps, note: "A useful route and location reference for guests." },
  { label: "SouthSide website", url: hotelProfile.social.website, note: "The hotel web address used in public listings." },
  { label: "SouthSide Snapchat place", url: hotelProfile.social.snapchat, note: "A location reference connected with the hotel." },
];

export const faqItems = [
  { question: "Where is SouthSide Hotel and Suites located?", answer: "SouthSide Hotel and Suites is on Winners Street in Abraka, Delta State, Nigeria. Call the hotel for the best directions from your starting point." },
  { question: "How can I make a reservation?", answer: "Use the booking page to begin with your dates, guests, and preferred room. You can also call or WhatsApp the hotel for a direct enquiry." },
  { question: "What are the public room rates?", answer: "The catalogue shows public guide rates for selected rooms. Contact the hotel to confirm the current rate for your dates before you travel." },
  { question: "What facilities are available?", answer: "SouthSide presents reception, rooms, a gym, lounge, food, and event related spaces. Ask the hotel about current access, hours, and arrangements." },
  { question: "What are the check in and check out times?", answer: "Call the hotel before your arrival for the current check in and check out times." },
  { question: "What payment methods are accepted?", answer: "Ask the hotel which payment method is best for your reservation and dates." },
];

export const pendingApprovals = [
  "Keep room information and prices current.",
  "Keep directions and guest policies current.",
  "Keep the official media library current.",
  "Keep the direct contact channels current.",
];
