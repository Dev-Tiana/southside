export type VerificationState = "verified" | "provisional" | "awaiting approval";

export const hotelProfile = {
  name: "SouthSide Hotel and Suites",
  location: "Winners Street, Abraka, Delta State, Nigeria",
  phone: "+234 705 562 8339",
  email: "Hotelsouthside@gmail.com",
  timezone: "Africa/Lagos",
  currency: "NGN",
  verification: "provisional" as VerificationState,
  social: {
    instagram: "https://www.instagram.com/southside_hotel/?hl=en",
    tiktok: "https://www.tiktok.com/@southside.hotel.abraka",
    website: "https://www.southsidehotelandsuites.com/",
    maps: "https://www.google.com/maps/search/SouthSide+Hotel+and+Suites+Abraka+Delta+State+Nigeria",
    snapchat: "https://www.snapchat.com/place/southsidehotelandsuitesabraka/daf89268-aa35-11f0-aa3d-171979d6f4a6",
  },
};

export const provisionalRooms = [
  {
    slug: "classic-room",
    name: "Classic Room",
    lead: "A considered room lead from the hotel’s public room content.",
    description: "A calm starting point for guests who want a straightforward stay in Abraka. The final bed details, occupancy, amenities, rate, and approved image are awaiting confirmation.",
    amount: 55000,
    evidence: "Instagram room content and a public TikTok classic room video",
    verification: "provisional" as VerificationState,
    amenities: ["Room details awaiting approval", "Image approval pending", "Rate confirmation pending"],
  },
  {
    slug: "royal-suite",
    name: "Royal Suite",
    lead: "A suite lead surfaced on the hotel’s indexed room pages.",
    description: "A larger stay option listed in public hotel content. Final suite details and current rate must be confirmed by the hotel before publication or booking.",
    amount: 65000,
    evidence: "Indexed public room page lead",
    verification: "provisional" as VerificationState,
    amenities: ["Suite details awaiting approval", "Image approval pending", "Rate confirmation pending"],
  },
  {
    slug: "superior-suite",
    name: "Superior Suite",
    lead: "A category named in the hotel’s public catalogue leads.",
    description: "A suite category retained as an editable catalogue lead. The hotel must confirm whether this name, configuration, and current price remain in use.",
    amount: null,
    evidence: "Public catalogue reference in the supplied brief",
    verification: "awaiting approval" as VerificationState,
    amenities: ["Category confirmation pending", "Image approval pending", "Rate confirmation pending"],
  },
  {
    slug: "luxury-room-205",
    name: "Luxury Room 205",
    lead: "A room lead retained without inventing a physical room specification.",
    description: "A public category lead that needs a current room name, inventory record, image, rate, and room details from the hotel before it can be sold online.",
    amount: null,
    evidence: "Public catalogue reference in the supplied brief",
    verification: "awaiting approval" as VerificationState,
    amenities: ["Category confirmation pending", "Physical room reference pending", "Rate confirmation pending"],
  },
  {
    slug: "luxury-room-208",
    name: "Luxury Room 208",
    lead: "A room lead retained without inventing a physical room specification.",
    description: "A public category lead that needs a current room name, inventory record, image, rate, and room details from the hotel before it can be sold online.",
    amount: 75000,
    evidence: "Public catalogue reference in the supplied brief",
    verification: "provisional" as VerificationState,
    amenities: ["Category confirmation pending", "Physical room reference pending", "Rate confirmation pending"],
  },
  {
    slug: "premium-room-306",
    name: "Premium Room 306",
    lead: "A premium room lead from public hotel content.",
    description: "A premium room category lead. Confirm its public name, room details, inventory, image rights, and current rate before any guest booking is accepted.",
    amount: 95000,
    evidence: "Public catalogue reference and social room content",
    verification: "provisional" as VerificationState,
    amenities: ["Category confirmation pending", "Image approval pending", "Rate confirmation pending"],
  },
  {
    slug: "premium-room-308",
    name: "Premium Room 308",
    lead: "A premium room lead from public hotel content.",
    description: "A premium room category lead. Confirm its public name, room details, inventory, image rights, and current rate before any guest booking is accepted.",
    amount: 95000,
    evidence: "Public catalogue reference and social room content",
    verification: "provisional" as VerificationState,
    amenities: ["Category confirmation pending", "Image approval pending", "Rate confirmation pending"],
  },
  {
    slug: "executive-accommodation",
    name: "Executive Accommodation",
    lead: "An executive category lead retained for hotel confirmation.",
    description: "An executive accommodation lead from public content. It remains hidden from live selling until the hotel confirms its current name, rate, inventory, and included features.",
    amount: 105000,
    evidence: "Public catalogue reference in the supplied brief",
    verification: "provisional" as VerificationState,
    amenities: ["Category confirmation pending", "Image approval pending", "Rate confirmation pending"],
  },
] as const;

export const facilityLeads = [
  { title: "Reception and arrival", copy: "Public videos show a reception and arrival sequence. Current access information and service hours need confirmation.", state: "provisional" as VerificationState },
  { title: "Gym", copy: "The likely official Instagram and TikTok content presents a gym. Equipment, access, and opening details need confirmation.", state: "provisional" as VerificationState },
  { title: "Food and dining content", copy: "Public social content shows food and kitchen scenes. Confirm whether this is a restaurant, room service, catering, or event service.", state: "provisional" as VerificationState },
  { title: "Lounge", copy: "The TikTok profile mentions a lounge. The format, availability, and guest access are awaiting approval.", state: "provisional" as VerificationState },
  { title: "Events", copy: "Social content and third party venue references indicate events related content. Event spaces and capacity are not yet confirmed.", state: "provisional" as VerificationState },
  { title: "Rooms and suites", copy: "Public media presents room and suite content across several categories. Each room detail needs a current hotel supplied record.", state: "provisional" as VerificationState },
];

export const publicSourceLinks = [
  { label: "Likely official Instagram", url: hotelProfile.social.instagram, note: "Strongest social identity signal, permission still required for every asset." },
  { label: "Likely hotel TikTok", url: hotelProfile.social.tiktok, note: "Public tours and room content, rights and account ownership remain provisional." },
  { label: "Google Maps listing", url: hotelProfile.social.maps, note: "Identity corroboration and mixed authorship photos." },
  { label: "Existing hotel website", url: hotelProfile.social.website, note: "Indexed public pages were found, but live retrieval was blocked during research." },
  { label: "Snapchat place", url: hotelProfile.social.snapchat, note: "Location corroboration and third party creator media." },
];

export const faqItems = [
  { question: "Where is SouthSide Hotel and Suites located?", answer: "Public sources place SouthSide Hotel and Suites on Winners Street in Abraka, Delta State, Nigeria. The preferred street wording and postal details should be confirmed by the hotel before launch." },
  { question: "How can I make a reservation?", answer: "Use the availability form on this site when room inventory and rates have been approved. Until then, contact the hotel by telephone or email for a reservation enquiry." },
  { question: "Are the room prices current?", answer: "The amounts shown in the catalogue are provisional leads from public content. They are not live approved rates and are not used to accept real bookings until hotel staff confirm them." },
  { question: "What facilities are available?", answer: "Public social content presents reception, rooms, gym, lounge, food, and events related scenes. Final facility details, access, and operating information await confirmation." },
  { question: "What are the check in and check out times?", answer: "The hotel has not yet confirmed operating times in the supplied research. The dashboard includes a place to configure them before publication." },
  { question: "What payment methods are accepted?", answer: "Payment activation is not yet configured. The booking flow therefore uses an enquiry or pending confirmation path rather than presenting a payment promise." },
];

export const pendingApprovals = [
  "Confirm the official hotel name and preferred address wording.",
  "Confirm room categories, inventory, occupancy, beds, amenities, photos, and rates.",
  "Confirm check in, check out, cancellation, refund, no show, deposit, and payment rules.",
  "Confirm which social images and videos are owned or licensed for website use.",
  "Confirm the operational email, WhatsApp use, payment credentials, and staff accounts.",
];
