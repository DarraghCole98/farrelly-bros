# Farrelly Bros Project Decisions

This file records architectural and design decisions that should not be
silently reversed later in development.

## 2026-08-27 — Initial Architecture

### Framework

Decision:
Retain Astro 7 + vendored Lumos 0.0.3.

Reason:
The project was scaffolded specifically around Lumos and its component,
token and accessibility systems.

### Styling

Decision:
Use Lumos CSS/custom-property architecture.

No Tailwind.

No additional UI framework.

### Lumos Core

Decision:
Treat the existing Lumos component library as framework code.

Prefer composition, custom project components or narrow variants instead
of rewriting framework components.

### Rendering

Decision:
Prefer static Astro rendering.

Do not add an SSR adapter unless a requirement later makes it necessary.

### Deployment

Decision:
Retain the existing Cloudflare deployment configuration unless a later
requirement necessitates a change.

### Services

Decision:
Services will use structured Astro content/data and one dynamic service
route.

Do not create eight duplicated page templates.

Route:

/services/[slug]/

### Projects

Decision:
Projects will be structured content with:

/projects/[slug]/

### Equipment

Decision:
Plant & Machinery should use structured content/data so equipment can
relate to services and projects.

### Plant Hire vs Plant & Machinery

Decision:
Keep these conceptually separate.

Plant Hire = a service.

Plant & Machinery = company capability/equipment library.

### Visual Editing

Decision:
Stacki will be used alongside Claude Code for visual refinement.

Code architecture should remain Stacki-friendly.

### Themes

Decision:
Use Lumos class-based themes.

Do not introduce automatic OS dark mode.

### Design

Decision:
Avoid generic AI-generated/SaaS visual patterns.

Prioritise authentic photography, typography, scale and restrained
industrial/editorial layouts.

### Development Order

Decision:
Do not generate the whole website before validating the system.

Initial representative pages will be:

1. Homepage
2. Tree Care service page

The service system should be validated using Tree Care before populating
all other service pages.

### Demo Page

Decision:
Keep example-components.astro temporarily as a Lumos implementation
reference.

Remove it before production launch.

### Forms

Decision:
Form UI may be planned, but the actual submission backend is currently
undecided.

Do not introduce a form provider or SSR architecture without an explicit
decision.

### Content Integrity

Decision:
Do not invent Farrelly Bros business facts to complete layouts.

Unknown factual information remains flagged for client confirmation.

## 2026-09-01 — Visual Direction Revision

The client asked for the site to be redesigned in the visual language of
arbomtl.ca — a lighter, more editorial, more marketing-led presentation
than the original brief described. These entries revise, and do not
silently reverse, the 2026-08-27 decisions above.

### Visual Reference

Decision:
Adopt arbomtl.ca as the layout and finish reference.

Reason:
Requested directly by the client, who identified its design, layout and
text sizing as the target quality bar.

Consequence:
The site is lighter, rounder and more marketing-led than the original
"industrial, grounded, not luxury" brief in docs/DESIGN.md. Buttons are
now pill-shaped, images and banners carry a larger radius, and services
are presented as a card collection. docs/DESIGN.md has been updated to
match rather than left contradicting the build.

### Typeface

Decision:
Replace Inter with Figtree, self-hosted at weights 400/500/600/700.

Reason:
Only Inter 400 was ever loaded, while every heading token asked for
weight 500 — so every heading on the site was being faux-bolded by the
browser. The reference site's finish depends on a geometric sans with
real bold weights.

Note:
This overrides "Do not introduce another typeface until typography is
specifically approved." Figtree is served as a single ~20KB variable
woff2 covering all four weights, downloaded at build time by Astro's
font pipeline — nothing is requested from Google at runtime.

### Colour

Decision:
Replace the provisional palette with one derived from the Farrelly Bros
logo. Primary green is now #0c9445, taken from the logo mark.

Reason:
The previous swatches were explicitly marked provisional and did not
match the real logo, which is built on a far brighter, more saturated
green.

Backgrounds are now near-white (#f5f7f4 page, #ffffff surfaces), dark
sections are deep forest (#0e3520), and body text is #17241c.

### Brand Theme Contrast

Decision:
.theme-brand uses dark forest text on a brand surface one step lighter
than the logo green — #1cb058, not #0c9445.

Reason:
White on the logo green #0c9445 measures 3.93:1 and fails WCAG AA. So
does forest #0e3520 on it, at 3.45:1. Lightening the surface to #1cb058
brings forest text to 4.78:1, which passes, while --brand-500 stays
#0c9445 for accents, borders and outlines. Solid buttons fill with
--brand-600 #0a7d3a, where white measures 5.24:1.

This is an accessibility constraint, not a preference — do not switch
the brand theme to white text.

### Type Scale

Decision:
Reduce the type scale. Display now runs 40→72px (was 64→112), h1 36→64
(was 48→80), h2 30→48 (was 40→64).

Reason:
The original scale read as loud rather than confident, and did not match
the restraint of the reference site.

### Logo Delivery

Decision:
Render the logo as an <img>, not an inlined SVG.

Reason:
The logo SVG is 156KB. Inlining it in both nav and footer put ~312KB
into every page's HTML. Served as an image it is fetched once and cached
across the site — the homepage dropped from 512KB to 204KB.

### Testimonials

Decision:
ContentTestimonial.astro exists but renders nothing.

Reason:
The reference site's testimonial section is part of its finish, but no
Farrelly Bros client testimonials have been confirmed. The component
renders only when a testimonial is passed, per Content Integrity above.

## 2026-09-01 — Remaining Pages Built

The five routes that nav and footer already linked to now exist, so no
internal link on the site 404s. Three of them are gated on information
Farrelly Bros has not yet supplied, and each degrades honestly rather
than being filled with invented content.

### Enquiry Form

Decision:
The contact form renders disabled behind a notice until FORM_ENDPOINT is
set in src/consts.ts.

Reason:
No form backend has been chosen (see Forms, above), and the site deploys
as static assets with no SSR. Lumos's `Form` component reports success
when it has no `action` — so shipping it unconfigured would tell someone
their enquiry had been sent when nothing was transmitted. The page
instead shows the fields disabled, states plainly that online enquiries
are not available yet, and emits no <form> element at all.

Consequence:
With SITE_CONTACT also empty, the site currently offers a visitor no way
to make contact. Resolving this is the highest-priority launch blocker.

### Privacy Policy

Decision:
/privacy-policy/ is published as a marked draft and added to
NOINDEX_ROUTES.

Reason:
A privacy policy is a legal document. Everything the page states about
the site is verifiable from this repository — no cookies or storage, no
analytics or tracking scripts, self-hosted fonts, an unconnected form.
Everything that depends on Farrelly Bros or on legal advice — registered
entity, address, data-protection contact, jurisdiction, retention
periods, third-party processors — is listed as outstanding rather than
written speculatively.

Remove the route from NOINDEX_ROUTES once a reviewed policy is in place.

### About — Company History

Decision:
The "company background/history" section in docs/CONTENT.md is omitted.

Reason:
No founding date, team size or geographic coverage has been confirmed.
The logo carries "Est. 1975", but a mark is not a verified source and
docs/PROJECT.md forbids inventing years of experience. Add the section
once the history is confirmed in writing.

### Projects and Plant & Machinery — Empty States

Decision:
Both pages ship with empty states and populate themselves from their
collections.

Reason:
The projects and equipment collections are empty, and docs/CONTENT.md
forbids fabricating a project or inventing manufacturer, model and
specification detail. Equipment categories are derived from the entries
themselves rather than hardcoded, so no fleet is implied that has not
been confirmed.

## 2026-09-01 — Service Page Template

The service page template was rebuilt to follow the ArboMTL service-page
layout the client identified as the target.

### Section Order

Decision:
Service pages run: scrim hero, capability row, "why us" split with a tick
list, overview split, applications, a centred process section with a
feature image and step row, a mid-page call to action, FAQ, related
services carousel, closing banner.

Every section beyond the hero is gated on authored content, so a service
with only a title, summary and hero image still renders as a clean
three-section page rather than a run of empty blocks.

### Content Schema

Decision:
The services collection gained `whyUs`, `process`, and `overview.points`.

Reason:
The reference layout needs tick lists and a process step row, and those
belong in content rather than hardcoded in the template — otherwise every
service would carry the same claims regardless of what is true of it.

### Content Written for Tree Care

Decision:
Tree Care is populated as the validated reference page; the other seven
remain frontmatter-only.

This follows the Development Order decision above — validate the system
on Tree Care before populating the rest.

Everything written is a restatement of positioning already approved in
docs/PROJECT.md and the existing overview copy. Deliberately absent, and
not to be added without confirmation:

- insurance cover
- certifications or accreditations
- years of experience or team size
- response times or guarantees
- anything about what happens to arisings beyond "agreed at quote stage"

The reference site leans on "over 20 years of combined experience" and
"fully covered insurance" in exactly these positions. Those are the
claims docs/PROJECT.md forbids inventing, so the equivalent slots carry
process description instead.

### Mid-page Call to Action

Decision:
The panel call to action renders only when an FAQ or related services
follow it.

Reason:
On a sparse service it would otherwise sit directly on top of the closing
banner, asking the same question twice in two different boxes.

## 2026-09-03 — Enquiry Form Backend

Decision:
`FORM_ENDPOINT` is set to Web3Forms (`https://api.web3forms.com/submit`),
switching both the contact page and `ContentEnquiryForm` on. A
`FORM_ACCESS_KEY` constant was added alongside it, and a hidden
`access_key` field plus a hidden honeypot `botcheck` checkbox were added
to both forms' markup — Web3Forms requires both to accept and to
spam-filter a submission.

Reason:
Resolves the highest-priority launch blocker recorded above (no way for a
visitor to make contact). The site remains fully static — Web3Forms is a
third-party POST target, so no SSR adapter or serverless function was
introduced, consistent with the Rendering and Forms decisions above.

Consequence — temporary destination:
The Web3Forms access key currently in use delivers to
darragh@offgridstudio.ie, not a Farrelly Bros address. `SITE_CONTACT.email`
is still `info@agriman.ie`, itself flagged in src/consts.ts as unconfirmed
against the farrellybros.ie domain. Both need Farrelly Bros' confirmed
inbox before launch: re-issue the Web3Forms key against that address and
update `FORM_ACCESS_KEY`, and update `SITE_CONTACT.email` to match.

## 2026-09-03 — Cookie Consent for Google Analytics & Search Console

Decision:
Added `GOOGLE_ANALYTICS_ID` and `GOOGLE_SITE_VERIFICATION` to
src/consts.ts (both empty placeholders) and a `CookieConsent` component
that gates Google Analytics behind explicit accept/reject consent, per
EU ePrivacy/GDPR rules on non-essential cookies.

Reason:
The site is about to be connected to Google Analytics and Google Search
Console. GA sets cookies and profiles visitors, which requires prior
consent under EU law; Search Console's verification tag sets no cookies
and needs none.

How it works:
- `CookieConsent.astro` renders a fixed bottom banner only when
  `GOOGLE_ANALYTICS_ID` is set. gtag.js is not requested at all until the
  visitor clicks Accept — reject or no action loads nothing analytics-
  related. The decision is stored in `localStorage` so the banner does
  not reappear.
- A "Cookie Preferences" link in the footer (also gated on
  `GOOGLE_ANALYTICS_ID`) re-opens the banner so a visitor can change
  their decision later, satisfying the "as easy to withdraw as to give"
  consent requirement.
- `GOOGLE_SITE_VERIFICATION` renders an unconditional
  `<meta name="google-site-verification">` tag in BaseHead — it sets no
  cookies, so it does not go through the consent flow.
- privacy-policy.astro now describes cookies/analytics conditionally on
  `GOOGLE_ANALYTICS_ID`, the same pattern already used for the enquiry
  form's `FORM_ENDPOINT` — so the page keeps describing only what the
  site actually does, per the Content Integrity decision above.

Consequence:
With both constants still empty, the site ships with no analytics, no
cookie banner and no verification tag — unchanged from before this
entry. Setting `GOOGLE_ANALYTICS_ID` to a real GA4 measurement id (and
`GOOGLE_SITE_VERIFICATION` to the Search Console token) switches on the
banner, gtag.js loading, the verification meta tag, and the privacy
policy's cookie section together.

## 2026-09-09 — Pre-launch Audit Fixes

A full content and technical audit was carried out (see the delivered
audit report). This entry records what was fixed directly and what
remains outstanding pending information only Farrelly Bros can supply.

### Demo Page Removed

Decision:
`example-components.astro` is deleted, per the 2026-08-27 decision to
remove it before launch. It was live, indexable, and present in the
built sitemap.

### Locale

Decision:
`SITE_LOCALE` changed from the Lumos scaffold default `en-US` to `en-IE`.

### Project Case Studies Reverted to Empty State

Decision:
The four project entries in `src/content/projects/` — Mast Access
Clearance, Co. Kildare (client "Cluain Tower Services"), Solar Farm Site
Clearance, Co. Meath ("Boyne Valley Solar Ltd"), Gas Pipeline
Reinstatement, Co. Offaly ("Private landowner (name withheld)"), and
Storm Damage Clearance, Co. Wicklow ("Glendarragh Estate") — are moved to
`docs/drafts/projects/` and are no longer part of the live `projects`
collection. The `relatedProjects` references to them were
removed from the six service entries that pointed at them
(agricultural-contracting, pipeline-reinstatement, site-clearance,
solar-farm-landscaping, telecoms-vegetation-management, wood-chipping).

Reason:
These entries carried named clients, specific figures, and quoted
testimonials with no corresponding decision-log entry recording them as
confirmed — directly contradicting the Content Integrity decision above
and the 2026-09-01 record that the projects collection was intentionally
left empty for exactly this reason. Confirmed with the client that these
were drafted placeholders, not verified case studies.

Consequence:
`/projects/` and the homepage's "Recent projects" section return to their
coded empty states. The drafted files remain in `docs/drafts/projects/`
as a starting point once real, client-approved case studies are ready —
recombine them with `docs/templates/project.md` and re-add the matching
`relatedProjects` entries at that point.

### Dead Asset Sweep

Decision:
Removed 19 image files from `src/assets/Images/` confirmed unreferenced
anywhere in `src/` (icon-style SVGs, a handful of numbered
`farrelly-brothersN.svg` files, and other stray uploads).

### FAQ Hub

Decision:
Added `/faq/` (`src/pages/faq.astro`), aggregating every service's `faq`
collection entries by service, with jump navigation and a closing CTA.
Linked from `UTILITY_NAV` and `FOOTER_NAV`.

Reason:
Every service page already carries a genuinely useful, specific FAQ
accordion, but none of it was visible anywhere except on that one
service's own page. The hub pulls the existing content into one place
rather than writing new copy, so it can't drift from the answers already
reviewed on the service pages.

### Enquiry Features

Decision:
Added `MobileCta.astro` — a fixed bottom bar shown below 48rem with a
tap-to-call button (`SITE_CONTACT.phone`) and a "Get a Quote" link to
`/contact/`, rendered from `BaseLayout` on every page except `/contact/`
itself. `Footer.astro` reserves space for it on mobile.

Also wired `/contact/`'s "Service required" dropdown to preselect from a
`?service=<slug>` query parameter, and updated both CTA buttons on the
service page template to link to `/contact/?service={slug}` — so
clicking through from a specific service arrives with that service
already chosen.

### Still Outstanding

Not fixed in this pass because they need information only Farrelly Bros
can supply — see the audit report:

- `SITE_URL` (still `http://localhost:4321`)
- `FORM_ACCESS_KEY` / the enquiry inbox it delivers to
- `SITE_CONTACT.email`
- `GOOGLE_ANALYTICS_ID` / `GOOGLE_SITE_VERIFICATION`
- `SITE_SOCIAL`
- the equipment collection (still empty)
- a WhatsApp link, service-area statement, and any safety/compliance or
  crew content — all deliberately withheld per Content Integrity above
  until the underlying facts are confirmed

## 2026-09-15 — Typeface Switch to Adobe Fonts

Decision:
Replace Figtree with two Adobe Fonts (Typekit kit `cbc6nnx`): Revolution
Gothic for headings (display, h1–h6) and Mr Eaves XL Modern for body
text (paragraphs, text-large/main/small). `--primary-family` now points
at Mr Eaves XL Modern; a new `--heading-family` token points at
Revolution Gothic and is used by every heading-level font-family token
in src/styles/base.css.

Reason:
Requested directly by the client, who supplied the Adobe Fonts project
(kit ID `cbc6nnx`) with both families already licensed.

How it works:
The kit's stylesheet (`https://use.typekit.net/cbc6nnx.css`) is linked
directly in BaseHead.astro, with preconnect hints for `use.typekit.net`
and `p.typekit.net`. Astro's self-hosted font pipeline (`fonts:` in
astro.config.mjs) was removed along with it — Adobe Fonts' license
covers embedding via their CDN, not redistributing the font files, so
this can't be self-hosted the way Figtree was.

Consequence:
This reverses the 2026-09-01 Figtree decision's "nothing is requested
from Google at runtime" property: every page load now requests font
files from Adobe's CDN, disclosing the visitor's IP address to Adobe.
privacy-policy.astro's "fonts are served from this website" claim was
rewritten to disclose this, per the Content Integrity decision above.

Weight mapping:
Mr Eaves XL Modern ships weights 400/700; Revolution Gothic ships
200/400/700/800 (plus a 400 italic). Neither includes 500 or 600, so
`--primary-medium` (500) and `--primary-semibold` (600) — still used
for nav, buttons and heading tokens — resolve to the nearest real
weight the browser's font matching finds (typically 400 or 700) rather
than a hardcoded remap. This is genuine font matching against a real
loaded face, not synthetic bolding.

## 2026-09-16 — Dedicated Sector Pages

Decision:
Added `/sectors/` and `/sectors/[slug]/`, giving each of the seven
confirmed sectors (docs/CONTENT.md, Home 07.) its own page, and rebuilt
the sector grid used on the homepage and About as photo cards — an image
with an icon badge over its corner, rather than the plain icon-and-label
tiles `ContentIconGrid` gave it. Each card now links to its sector page.

Reason:
Requested directly by the client, referencing a photo-card sector layout
on a reference site as the quality bar, and asking for the sectors to
route somewhere rather than being a dead-end visual strip.

How it works:
- `src/data/sectors.ts` gained `slug`, `image`, `imageAlt`, `summary` and
  a `services` array per sector (service ids from the services
  collection). It remains plain structured data, not a content
  collection — the set is small, fixed, and already confirmed, so it
  doesn't need frontmatter files the way services/projects/equipment do.
- A new `ContentSectorGrid` component renders the photo-card tiles (used
  by `ContentSectors` on the homepage/About, the sectors index, and each
  sector page's "other sectors" block). `Card` gained an optional `icon`
  prop — a badge over the image's corner — for reuse elsewhere.
- Each sector's images are existing, already-published site photography
  (mostly a service's own hero image, reused where topically relevant),
  not new uploads. Two decorative "agricultural fields" / "felled trees"
  illustration assets already sitting unused in `src/assets/Images/`
  were considered and rejected for this — they're vector illustrations,
  not photography, and the 2026-09-01 Visual Reference decision commits
  to authentic photography.
- Each sector page's "Relevant services" section is a curated subset of
  the existing services collection (which services apply to that
  sector), pulling each service's own already-approved summary and hero
  image. No new per-sector service copy was written, so nothing here is
  a claim beyond what the service pages already state.

Consequence — no client-logo strip, then a placeholder one added:
The reference layout paired its sector grid with a "Trusted by our
clients" logo strip. Real logos were not built — no Farrelly Bros client
has been confirmed for public display, and the logos on the reference
site belong to that other business, not Farrelly Bros. At the client's
request, a placeholder version was added instead:
`ContentClientMarquee.astro` wraps the existing `Marquee` component
(already in the framework, previously used for the services slider) with
a small "Trusted by" label and a scrolling row of plain dashed-outline
chips reading "Client Logo", "Brand Mark" and similar — deliberately
generic text, not stylised to resemble a real wordmark, so it reads as a
placeholder rather than an implied client. It renders under the sector
grid wherever `ContentSectors` appears (homepage, About) and on
`/sectors/`. Swap `PLACEHOLDER_ITEMS` in that file for real logo images
once Farrelly Bros confirms which clients it wants shown publicly.

## 2026-09-16 — Interior Heroes and Media Splits

Adopted from heartwoodtrees.co.uk at the client's request.

### Interior Page Heroes

Decision:
Every interior page hero uses `SectionHeroMedia`: the photo held to the
right half, fading into a dark forest ground on the left, with the
end-grain of a cut log blended through that ground as texture.

Applies to About, Services, every service page, Plant & Machinery,
Projects, every project page, Contact and FAQ. The homepage keeps its
own split hero and gallery.

Below 64rem the photo sits behind the whole hero, held back far enough
for the copy to read over any part of it.

### Media Splits

Decision:
Image-and-copy sections use `ContentMediaSplit`, in one of two forms:

- `panel` — the copy sits on a tinted, woodgrain-textured panel that
  stops short of the photo's far edge; the photo overlaps it and runs past
- `offset` — the photo sits on a tinted, textured block of its own,
  shifted down and outward from behind it

Both surfaces are mixed from the section's own background, so they stay a
quiet step away from it on light or dark sections.

Used on the service pages (why-us as `panel`, overview as `offset`) and
on the About and homepage Plant & Machinery sections.

### Textures

Decision:
Textures stay subtle and are never the subject. The hero uses the log
end-grain through `soft-light`; panels and blocks use the woodgrain line
art through `multiply`, faded out before it reaches the copy or photo.

The footer contour artwork was tried for the hero and rejected: it is a
handful of sweeping lines drawn over a solid backing shape, too sparse to
read as texture and leaving a hard-edged blob behind the text.

## 2026-09-16 — "Why Farrelly Bros" Section (About)

Decision:
Filled the "07. Safety and professionalism" slot in About's outline
(docs/CONTENT.md) with a new dark, two-column section: a heading, intro,
a six-point reason list, and a photo, with two faint decorative leaf
graphics in the section's corners.

Reason:
Requested directly by the client, referencing a "Why Heartwood?" section
on another site as the layout to match — heading, checklist-style
reasons with an icon each, and a photo alongside.

How it works:
- The two corner graphics are client-supplied assets —
  `src/assets/Images/pngs/3-leaves.png` and `5-leaves.png` — not drawn for
  this project. Both are transparent PNGs with their fade already baked
  into the alpha channel (max ~9% opacity), so `ContentWhyUs.astro`
  applies no extra opacity or colour treatment, just position and size.
  An earlier pass tried a hand-drawn SVG leaf instead; that was wrong and
  was replaced with these once the client pointed out the PNGs they'd
  already supplied.
- `ContentWhyUs` takes them as `topLeafImage`/`bottomLeafImage` props
  (defaulting to 3-leaves/5-leaves respectively) rather than hardcoding
  them, so either corner's graphic can be swapped per instance — including
  from Stacki, since both are plain `ImageMetadata` props. About currently
  passes `topLeafImage={_5_leaves} bottomLeafImage={_3_leaves}`, the
  opposite of the component's own defaults, set via Stacki.
- Both graphics sit flush in their corner (`top:0;left:0` /
  `bottom:0;right:0`), not bled past the section's edge — the wrapper
  around them clips to the section's own bounds, so any negative offset
  cropped most of the graphic away instead of just trimming it.
- `ContentReasonList.astro` is a new component: an icon in an outlined
  circular badge beside a short label, two columns from 30rem up.
  Visually distinct from `ContentChecklist` (filled tick discs, single
  column) — this list is longer and the reference's badges are outlined,
  not filled.
- `ContentWhyUs.astro` composes both into the full section: `Section`
  theme="dark", `ContentWrapper variant="columns"` for the heading/intro/
  list against the photo.

Content — no certifications or insurance figures:
The reference section's actual points are an accreditation, four
insurance figures, and other safety statistics. None of that is
reproduced. docs/PROJECT.md forbids claiming certifications, insurance
cover or safety statistics that have not been verified for Farrelly
Bros, and the 2026-09-01 Service Page Template decision above already
excluded the same categories from Tree Care's whyUs section for the same
reason. The six points used instead restate positioning already
published elsewhere on the site (services/index.astro's `PROMISES`,
tree-care.md's `whyUs.points`) rather than asserting anything new. Revisit
with real figures once Farrelly Bros confirms its accreditations and
cover.

## 2026-09-17 — Breadcrumbs and Service Capability Layout

### Breadcrumbs

Decision:
Added `Breadcrumbs.astro` — a `Home / Section / Page` trail, with
`BreadcrumbList` structured data — directly under the hero on every
interior page: About, Services (index and each service), Sectors (index
and each sector), Projects (index and each project), Plant & Machinery,
Contact, FAQ and Privacy Policy. The homepage has none, since it is the
trail's own root.

Reason:
Requested directly by the client, referencing another site's breadcrumb
placement as a navigation pattern worth adopting sitewide.

How it works:
Each page passes its own `items` array explicitly (e.g. `[{label:
"Home", href: "/"}, {label: "Services", href: "/services/"}, {label:
data.title}]`) rather than the component deriving a trail from the URL —
consistent with how every other `Content*` component here takes explicit
data rather than inferring it from routing. The last item never carries
an `href` and renders as plain text with `aria-current="page"`.

### Service Capability Layout

Decision:
Replaced the icon-card grid (`ContentFeatureRow`) in each service page's
"Capabilities" section with `ContentCapabilitySplit`: two overlapping
photos, a two-column checklist, and a CTA button, with one of the site's
leaf graphics faded behind the photos.

Reason:
Requested directly by the client, referencing another site's service-page
layout (a "Tree Surgery" section with paired photos and a capability
checklist) as the pattern to bring across.

How it works:
- `ContentCapabilitySplit.astro` is new: a grid of content (heading,
  intro, checklist, button) against a visual (a large photo with a
  smaller one overlapping its corner, plus a faint leaf watermark behind
  both). Structurally similar to `ContentMediaSplit`'s grid/reverse
  handling, but built separately since the dual-photo visual doesn't fit
  that component's single-image slot.
- `ContentChecklist` gained a `columns` prop (1, the existing default, or
  2) instead of a new component, so the tick-mark styling stays one
  system rather than forking a second checklist look.
- The two photos are whichever of the service's own `whyUs.image` /
  `hero.image` and `overview.image` / `process.image` are already set —
  the same photos already shown further down the same page in the
  whyUs/overview sections, not new photography. The checklist items are
  `data.capabilities[].title`, unchanged from what the card grid showed.
- Applied once, in `services/[slug].astro`, so it reaches all eight
  service pages through the shared template rather than being repeated
  per page.

Content — no sub-service breakdown:
The reference page split one service area (“Arboriculture & Tree
Services”) into several of these sections, one per sub-service (“Tree
Surgery”, and presumably others below it). This site's content model has
no sub-service grouping under each of the eight services, and inventing
one wasn't in scope here — so each service page gets one
`ContentCapabilitySplit`, covering that service's full capability list,
not several stacked sections.
