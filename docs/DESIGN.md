# Farrelly Bros Design Direction

## Core Creative Direction

The Farrelly Bros website should feel like the digital presence of a
serious specialist contractor.

The strongest visual ingredients should be:

- authentic project photography
- machinery
- people working
- scale
- land
- infrastructure
- confident typography
- strong composition
- generous whitespace
- clear information hierarchy

The website should feel bespoke and editorial rather than assembled from
generic website blocks.

## Brand Character

The visual identity should communicate:

Established
Capable
Technical
Grounded
Professional
Premium
Practical
Experienced

It should NOT feel:

SaaS
Startup-like
Futuristic
Overly corporate
Playful
Artificially eco-focused
Template-driven

Note (2026-09-01): the site now follows arbomtl.ca as its visual
reference — lighter, more editorial and more marketing-led than this
section originally described. "Industrial" has been dropped from the
list above, since the finish is deliberately cleaner than that word
implies.

## Photography

Photography should be one of the strongest parts of the site.

Prioritise imagery showing:

- machinery operating
- arborists working
- large-scale site clearance
- vegetation management
- timber processing
- infrastructure environments
- agricultural environments
- renewable-energy sites
- equipment
- operators
- project scale
- finished work

Prefer authentic Farrelly Bros photography whenever available.

Photography should generally feel:

- documentary
- grounded
- substantial
- natural
- high impact

Avoid making every image look like generic stock photography.

Large image treatments are preferred over excessive collections of
small thumbnails.

## Layout

Prefer:

- strong grid systems
- large photography
- deliberate asymmetry where appropriate
- generous vertical spacing
- strong section composition
- clear content hierarchy
- large editorial statements
- controlled use of cards
- varied section rhythm

Avoid making every section:

heading
paragraph
three identical cards
button

The website needs visual rhythm.

Alternate between:

- image-led sections
- typography-led sections
- project features
- service layouts
- quieter information sections
- stronger brand/theme sections

## Cards

Cards should only be used when the content genuinely behaves as a
collection.

Examples:

- services
- projects
- equipment

Avoid excessive cards for ordinary body content.

Do not place every statistic, paragraph or feature inside a card.

## Corners and Shape Language

Use the Lumos radius system.

- --radius-small (0.5rem) — small surfaces
- --radius-main (1rem) — cards and panels
- --radius-large (1.5rem) — hero imagery, media blocks, the CTA banner
- --radius-round — buttons

Buttons are pill-shaped. Larger content areas stay restrained at
--radius-large or less.

Avoid:

- floating rounded badges everywhere
- exaggerated soft SaaS UI

## Colour

The palette is derived from the Farrelly Bros logo, whose primary green
is #0c9445. Swatches live in section 1 of src/styles/base.css and are
never used directly — section 2 maps them onto semantic tokens, and
components only ever read those.

Swatches:

- --light-100 #ffffff — surfaces, cards, nav
- --light-200 #f5f7f4 — page background
- --light-300 #e7ebe6 — subtle surface, hairlines
- --ink-900 #17241c — body and headings on light
- --ink-600 #5c6b62 — muted body text on light
- --forest-700 #1c5a33
- --forest-800 #14472a
- --forest-900 #0e3520 — dark sections and footer
- --brand-500 #0c9445 — accents, borders, brand theme
- --brand-600 #0a7d3a — solid button fills and hovers
- --brand-accent #22c55e — heading accent, dark theme only
- --neutral-500 #6b7770

Use semantic Lumos theme tokens.

Do not create a separate parallel colour system.

Themes:

.theme-light
- near-white background, dark green-black text

.theme-dark
- deep forest background, light text

.theme-brand
- bright Farrelly green background, dark forest text

Accessibility constraint: .theme-brand uses dark forest text on bright
green because white on #0c9445 measures ~2.9:1 and fails AA. Do not
switch it to white text. Solid buttons fill with --brand-600, where
white measures ~4.6:1.

Sections should deliberately select themes.

Do not implement automatic operating-system dark mode.

## Typography

The typeface is Figtree — a geometric-humanist sans, self-hosted at
weights 400/500/600/700 via Astro's font pipeline as a single variable
woff2. It replaced Inter, which was only ever loaded at weight 400 and
left every heading faux-bolded.

Typography should be confident, straightforward and highly legible.

Prefer:

- bold display statements
- compact headings
- comfortable body text
- strong hierarchy

Avoid:

- decorative fonts
- overly technical futuristic typography
- excessive uppercase
- tiny interface-style typography

Scale (fluid, 320 → 1440):

- display 40 → 72, bold
- h1 36 → 64, bold
- h2 30 → 48, bold
- h3 26 → 36, semibold
- h4 22 → 28, semibold
- h5 19 → 22, semibold
- h6 16 → 18, semibold
- text-large 17 → 19
- text-main 16 → 17, line-height 1.6
- text-small 14 → 16

Retune the scale by editing only the -min / -max numbers in
src/styles/base.css. Never edit the clamp() expressions, and never
hardcode font sizes.

## UI

UI should be restrained.

Avoid common AI-generated website tropes such as:

- gradient blobs
- glowing backgrounds
- glassmorphism
- random floating pills
- excessive icons
- icon-in-a-rounded-square feature grids
- dashboard styling
- decorative charts
- meaningless statistics
- unnecessary marquees
- animation on every object

## Buttons

Buttons should have strong labels.

Examples:

Explore Our Services
View Project
View Service
Discuss a Project
Contact Farrelly Bros
Request a Quote

Avoid vague CTA labels such as:

Click Here
Discover More

"Learn More" may be used sparingly but a more contextual label is
preferred where practical.

## Motion

Motion should be subtle and support comprehension.

Potential uses:

- navigation transitions
- image reveals
- restrained scroll reveals
- hover states
- project transitions

Avoid:

- constant movement
- excessive parallax
- bouncing
- gratuitous text animation
- animations that delay access to information

Respect reduced-motion preferences.

## Responsive Behaviour

Mobile should be designed intentionally, not treated as collapsed
desktop.

Prioritise:

- readable typography
- clear service navigation
- large usable tap targets
- logical content order
- properly cropped imagery
- simple enquiry routes

Avoid overcrowding mobile layouts.

## Stacki

Components should remain visually editable through Stacki.

Prefer:

- meaningful component boundaries
- typed props
- CSS custom properties
- simple Astro markup
- Lumos tokens
- predictable layouts

Do not create abstraction purely for abstraction's sake.
