# SouthSide Hotel and Suites Platform Plan

## Product scope

Build a professional public hotel website and a maintainable reservation management platform for SouthSide Hotel and Suites in Abraka, Delta State, Nigeria. The website will use a warm editorial hospitality direction inspired by the information hierarchy, photography led storytelling, and direct booking emphasis of Holston House Nashville, while remaining original to SouthSide and never using Hyatt branding, copy, or imagery.

The platform will distinguish verified information from provisional public information and hotel supplied information. Unknown room details, rates, facilities, policies, operating times, reviews, awards, and legal text will remain clearly marked for confirmation. Live bookings and payments will remain inactive until the hotel confirms the required operational data and integrations.

## Implementation approach

Use the initialized React, Express, tRPC, Drizzle, and MySQL compatible managed database starter. Keep public content in typed application modules so it is easy to edit, and create a database schema for room categories, rates, inventory blocks, reservations, guests, holds, payments, content settings, media records, and audit history. Use Africa/Lagos for operating logic and server side calculations.

The public application will use routes for home, accommodation, room detail, facilities, gallery, about, contact and location, offers, FAQs, policies, booking search, booking review, confirmation, and error states. The private dashboard will use Manus OAuth application sessions, the existing protected procedure pattern, role checks, and private data responses.

Availability will be calculated by the server from room category inventory, reservations, pending holds, and maintenance blocks. Reservation creation will recheck availability in a database transaction and store a unique non sequential reference, nightly rate snapshots, status history, and payment state. The client will never be authoritative for price, availability, payment, or reservation confirmation.

Paystack will be represented by a disabled ready integration boundary. The public flow will offer enquiry or pending confirmation when payment configuration is missing. No secret or fake success state will be exposed. Email, analytics, maps, WhatsApp, image uploads, and notifications will be configuration driven and documented where external credentials are needed.

## Design system

### Design movement

1. Editorial West African Modernism, probability 0.04.
2. Quiet Coastal Minimalism, probability 0.06.
3. Contemporary Heritage Hospitality, probability 0.08.

Chosen direction: **Editorial West African Modernism**.

### Core principles

1. Let authentic photography carry the emotional weight while keeping claims precise.
2. Balance warm material tones with disciplined typography and clear booking actions.
3. Use asymmetrical editorial composition instead of a generic centered card grid.
4. Make operational truth visible through confirmation labels and restrained, useful copy.

### Color philosophy

Use a deep ink tone for authority, a warm parchment background for ease, and a signature copper accent for human warmth and local character. Supporting olive and clay tones can appear in small details when genuine photography supports them. Color should feel tactile and calm, never glossy or over engineered.

Core tokens: ink #17211F, parchment #F3EEE7, cream #FBF8F3, copper #B36D45, moss #5B6758, clay #C7A58E, line #D9D1C7.

### Layout paradigm

Use a layered editorial flow. Pair wide image fields with offset text blocks, compact booking controls that overlap the hero boundary, and alternating image to text rhythms. On mobile, collapse into a single readable flow with the booking form remaining early and visible.

### Signature elements

1. A slim copper rule with a small location marker beside section labels.
2. Oversized serif display headings paired with compact uppercase utility text.
3. Image captions and verification labels that make the source and status of content understandable.

### Interaction philosophy and animation

Interactions should feel deliberate and calm. Use short opacity and transform transitions for reveal, hover, and route changes. Prefer visible focus rings and immediate feedback over motion. Respect reduced motion preferences. Do not use autoplay video, large parallax effects, or animation to convey essential information.

### Typography system

Use a serif display family with a distinctive editorial feel and a clean sans serif for body copy and controls. Headings should be large but compact, body copy should be readable at mobile widths, and labels should use increased letter spacing sparingly. Keep the hierarchy consistent across public pages and the dashboard.

### Brand essence and voice

Positioning: A thoughtful Abraka stay with clear rooms, warm service, and a simple path to reserve.

Personality: grounded, welcoming, assured.

Voice: specific and hospitable, never boastful. Example lines: “A calmer place to arrive in Abraka.” and “Choose the room that fits your stay.”

### Wordmark and logo

Create a simple typographic mark using the initials SS inside a thin copper frame, with the full name set beneath in small tracked capitals. Use text fallback when the logo asset is not yet supplied by the hotel. Never imply that a temporary mark is the final registered identity.

### Signature brand color

Copper #B36D45 is the ownable SouthSide accent. It links the warm hospitality tone to the hotel’s sense of place without relying on a metallic gradient.

## Project structure

```text
client/src/
  App.tsx                    Route map and application shell
  index.css                  Design tokens, responsive rules, accessibility states
  components/                Header, footer, booking widget, gallery, content blocks
  pages/                     Public pages, booking flow, and admin dashboard
  lib/                       tRPC client and shared frontend helpers
server/
  routers.ts                 Auth, content, availability, reservations, admin procedures
  db.ts                      Database access and transactional queries
  _core/                     Starter server, auth, context, and health handling
drizzle/
  schema.ts                  Users, rooms, inventory, reservations, payments, content, audit
  migrations/                Repeatable database migrations
public/
  manus-routes.json          Complete public route manifest
  robots.txt                 Crawler policy
  sitemap.xml                Public page sitemap with configurable origin
research/                     Public source research and photography evidence
  photography-inventory.csv  Asset inventory with source and permission fields
docs/
  architecture.md            Runtime, database, auth, storage, deployment
  operations.md              Reservation and dashboard operating guide
  seo.md                     Keyword map and SEO implementation record
  qa-report.md               Honest test and limitation report
  launch-checklist.md        Preconditions for real bookings
```

## Delivery sequence

1. Complete and save research findings, official source verification, photography inventory, and provisional data notes.
2. Replace the starter screen with the public experience, route manifest, SEO files, and original design system.
3. Add database schema, migrations, server procedures, server side pricing, availability, holds, reservation state transitions, and audit history.
4. Add protected dashboard views and configuration forms for room data, rates, inventory, policies, content, and media status.
5. Add disabled Paystack boundary, contact submission handling, image management records, and integration documentation.
6. Run type, build, route, API, reservation, admin, SEO, and accessibility checks available in the environment. Fix confirmed issues.
7. Save a checkpoint and report what is implemented, what is simulated, what needs credentials, what needs hotel confirmation, and what remains incomplete.

## Explicit limitations to preserve

The current brief does not confirm a final logo asset, official domain, room quantities, individual room numbers, bed configurations, maximum occupancy, room sizes, amenities by room, facilities, restaurant hours, policies, taxes, payment credentials, email provider, WhatsApp approval, or staff accounts. The platform will provide safe configuration surfaces and will not invent these details. The initialized managed database is shared by development and publication, so test data must be clearly labelled and production readiness must be verified before accepting real reservations.
