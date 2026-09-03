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
