# TS-SPACES

A complete Next.js App Router, React, TypeScript and Tailwind CSS coworking website. Includes six main pages, editable SVG branding, accessible mobile navigation and FAQ accordions, plus draft privacy/terms pages, local stock photos, metadata, structured data, sitemap and robots routes.

## Setup

Requires Node.js 20.9+ and npm. On Windows use `npm.cmd` if PowerShell blocks npm.ps1.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Production checks and execution:

```sh
npm run typecheck
npm run build
npm start
```

Deploy to a Node.js host supporting Next.js (for example Vercel or a container/server). Set environment variables in the host, set NEXT_PUBLIC_SITE_URL to the actual HTTPS origin before building, run the build, and start with the platform-provided PORT. This application requires a server for the enquiry API and is not a static export. A Cloudflare Sites deployment would require an adapter and is not provided by this standard Next.js project.

## Content updates

- `data/site.ts`: business contact information, navigation, services, amenities, FAQs, social destinations and image paths.
- `app/page.tsx`: homepage sections and headlines; individual `app/*/page.tsx` files hold page introductions and metadata.
- `components/Shared.tsx`: common CTA, maps, footer and cards; `components/Header.tsx`: logo/navigation.
- `app/globals.css`: brand tokens, layouts and responsive styles; Tailwind is available throughout.
- `public/logo-mark.svg` and `app/icon.svg`: original scalable geometric logo mark and favicon. The horizontal logo is composed from the mark and brand type in Header.
- `public/images`: replace illustrative stock images with approved business photography, update alt text, and remove illustrative labels only after verification.

This is a Next.js site with centralized editable source content, not a WordPress website or dashboard. WordPress editing requires a separate headless CMS integration.

## Real enquiry delivery

Set INQUIRY_WEBHOOK_URL to a trusted HTTPS backend, CRM automation, or mail delivery gateway that durably accepts JSON POSTs. Optional INQUIRY_WEBHOOK_TOKEN is sent as a Bearer token server-side only. The endpoint must return 2xx only after acceptance; redirects are rejected and requests time out after 10 seconds. Payload: name, email, phone, workspace, date, message, website (empty honeypot), source, submittedAt. Do not log the payload unnecessarily.

`app/api/inquiry/route.ts` validates on the server; the client uses the same validation in `lib/inquiry.ts`. Missing configuration returns 503 and disables the form. Failed upstream delivery returns 502; only upstream acceptance produces a success state. No fake email or browser-only submission is used. Visit requests never imply a confirmed reservation.

Before enabling: review privacy terms, configure durable storage/delivery and data retention, add gateway-level rate limiting/bot protection, and perform an end-to-end test to the real destination. The honeypot and origin check are basic protections, not distributed rate limiting. Avoid automatic retry after ambiguous timeouts without checking the receiver for duplicate enquiries.

## Map

The default iframe searches the supplied Tejas Imperial / Bhujbal Chowk address. It is an area preview, not a verified business pin or entrance. Replace NEXT_PUBLIC_MAP_EMBED_URL with the business-approved embed. No API key is required. Google is contacted when the iframe loads.

## Business confirmation before public launch

- Verify the address, exact entrance, map pin, visit arrangements and opening hours.
- Supply approved phone/email, social links, legal entity and production domain.
- Confirm every facility: Wi-Fi/specifications, AC, parking/charges, refreshments, power backup, furniture, meeting rooms/equipment, shared areas and access.
- Confirm available services, capacity, rates, membership/booking/cancellation policies. No prices or capacity are invented.
- Replace stock photos with actual photography where possible; obtain permission for any genuine testimonials. Testimonials are intentionally omitted until real reviews are provided.
- Approve privacy policy, terms, data processing arrangements, retention and contact information.
- Configure the delivery endpoint and test valid, invalid, missing-configuration and upstream-error cases.
- Run browser checks at 320, 375, 430, 768, 1024, 1280 and 1440px, portrait/landscape; keyboard navigation, mobile menu, focus states, accordions and form interactions. Confirm no document overflow and review Lighthouse on the deployed domain.

## Image credits

Local illustrative photographs downloaded from Unsplash image URLs (Unsplash license: https://unsplash.com/license). They are not represented as TS-SPACES photographs:

- hero: photo-1524758631624-e2822e304c36
- shared: photo-1497366811353-6870744d04b2
- desk: photo-1497215728101-856f4ea42174
- individual: photo-1497366216548-37526070297c
- meeting: photo-1497366858526-0766cadbe8fa
- team: photo-1524758631624-e2822e304c36

The original logo uses geometric office/desk forms and no third-party brand mark.

## Browser verification

Start the production server with `npm start`, then run `npm test`. Install a browser with `npx playwright install chromium` on a fresh machine. Optional PLAYWRIGHT_CHROMIUM_EXECUTABLE selects an existing browser. Tests cover all eight pages at seven widths, image loading, the mobile menu, FAQs, invalid requests and missing delivery configuration. Real webhook delivery and Safari/Firefox require separate deployment verification.

## Verification performed

- Production build and TypeScript checks passed.
- Chromium tested all eight pages at 320, 375, 430, 768, 1024, 1280 and 1440 pixels with no horizontal overflow and images loading.
- Mobile menu, FAQ expansion, invalid input validation, invalid-date rejection and unconfigured webhook responses were tested.
- Not verified: real webhook receipt (credentials not supplied), exact map entrance, Safari/Firefox, physical devices, or deployed Lighthouse scores.
