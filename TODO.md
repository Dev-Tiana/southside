# SouthSide Hotel and Suites Build Outcomes

## Public hospitality website

The public website must be professionally designed, responsive, accessible, image rich, and original to SouthSide. It must include a homepage with a prominent booking interface, verified hotel imagery where available, room and suite presentation, verified facilities, dining only when confirmed, gallery preview, practical reasons to stay, location and contact details, FAQs, and a final booking call to action. It must also include accommodation, individual room pages, facilities, gallery, about, location and contact, offers, FAQ, editable policy pages, booking search and review states, confirmation, cancellation or modification requests, error states, and not found handling.

## Research and photography evidence

Research the Hyatt Holston House Nashville reference and SouthSide public website and public accounts. Record verified official account links and the evidence supporting each identification. Organize accessible hotel photography by category, record source and permission status, flag third party or unresolved assets, and do not publish images whose reuse permission remains unresolved. Provide an inventory, strongest candidate contact sheet where possible, inaccessible source list, required hotel supplied photographs, and section recommendations.

## Database backed reservations

The booking engine must use the persistent managed database. Server side availability must consider category inventory, confirmed reservations, active holds, pending reservations that consume inventory, manual reservations, maintenance blocks, overlapping dates, cancellation status, and hold expiry. Dates must use Africa/Lagos operations and consistent check in and check out boundaries. Online and manual reservations must use the same inventory and must be protected against double booking through transactions, locks, or equivalent database constraints.

## Pricing and reservation states

The server must calculate nights, nightly rates, room quantity, configured taxes and charges, approved discounts, total, amount paid, and outstanding amount. Browser submitted prices must never override server values. Store the applicable rate and terms snapshot with each reservation. Use explicit statuses including draft, pending payment, pending manual confirmation, confirmed, checked in, checked out, cancellation requested, cancelled, expired, and payment failed. Record status history, actor, timestamp, and a unique non sequential reservation reference.

## Staff dashboard and permissions

The dashboard must be private and authenticated. It must show arrivals, departures, occupancy only when accurate, upcoming and pending reservations, pending payments, cancellations, maintenance blocks, and selected period counts with limitations made clear. Authorized roles must manage room categories, descriptions, photographs, occupancy, beds, verified amenities, rates, inventory, maintenance, reservations, manual bookings, payments, notes, notifications, reports, settings, policies, website content, offers, FAQs, staff access, and audit logs. Role permissions must restrict sensitive operations.

## Payment and integration readiness

Paystack must be implemented in a disabled or test ready state until required credentials, account approval, webhook configuration, and payment tests exist. A payment redirect alone must not mark a reservation paid. Secret keys must stay server side. When payment is unavailable, the user must see an enquiry or pending confirmation route rather than a fake checkout. Email, messaging, maps, analytics, image storage, and notifications must be configuration driven and documented as non operational until actually tested.

## Accuracy and safety

Do not fabricate reviews, awards, star ratings, occupancy figures, facilities, room details, policies, taxes, discounts, legal commitments, or business claims. Provisional room categories and prices from public content must remain labelled for confirmation. Do not invent physical room numbers or quantities. Do not publish third party photographs without permission. Treat names, contacts, reservations, and payment records as private.

## SEO and discovery

Implement unique page titles, descriptions, canonical URLs when a real public origin is configured, clean URLs, headings, descriptive alt text, internal linking, XML sitemap, robots directives, Open Graph metadata, crawlable content, responsive layouts, relevant schema that matches visible content, and Google Search Console and analytics readiness. Provide a keyword to page map, local search recommendations, AI search ready factual content, and a prioritized ninety day visibility plan without ranking promises.

## Forms and accessibility

The booking widget must validate dates and guest counts, reject past and invalid dates, show loading and useful error states, and work without horizontal scrolling. The contact form must validate name, email, telephone, enquiry type, message, privacy notice, and spam protection and must only show success after backend acceptance. Interactive elements need labels and names, keyboard support, visible focus, adequate contrast, understandable errors, responsive layouts, and reduced motion support.

## Quality evidence and handoff

Run available type, build, route, UI, availability, pricing, reservation, payment, admin, security, SEO, and accessibility checks. Report actual results. Deliver architecture, database schema, setup, environment variables, migrations, administrator setup, deployment, payment and email instructions, backup and recovery guidance, operating guide, troubleshooting, QA report, launch checklist, unresolved requirements, and confirmation of which items were actually integrated or remain pending.
