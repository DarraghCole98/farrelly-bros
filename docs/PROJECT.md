# Farrelly Bros Website

## Project

Design and develop a new website for Farrelly Bros.

Industry:

Arboriculture & Specialist Contracting

Farrelly Bros is not to be presented as merely a domestic tree-surgery
company.

The website should communicate a broader specialist contracting
capability spanning arboriculture, vegetation management, site
clearance, machinery-led work, agricultural contracting and specialist
infrastructure work.

The brand should feel capable of working on substantial commercial,
infrastructure, utility, renewable-energy and land-management projects,
while still remaining accessible to appropriate private clients.

## Primary Objectives

1. Clearly communicate the complete range of Farrelly Bros services.
2. Position the company as an experienced specialist contractor.
3. Demonstrate machinery, equipment and operational capability.
4. Generate qualified project enquiries.
5. Build trust with commercial and infrastructure clients.
6. Showcase real projects and work completed.
7. Establish a strong SEO architecture around individual services.
8. Create a scalable website that can grow with the business.

## Primary Audiences

- Main contractors
- Construction companies
- Infrastructure contractors
- Utility companies
- Telecoms companies
- Renewable energy developers/operators
- Commercial landowners
- Agricultural clients
- Property developers
- Local authorities where relevant
- Private clients requiring specialist work

The website should be particularly convincing to someone assessing
whether Farrelly Bros has the experience, machinery and resources to
undertake demanding work.

## Positioning

The website should communicate:

Experienced.
Capable.
Specialist.
Practical.
Professional.
Well equipped.
Reliable.
Established.

Avoid portraying the company primarily as:

- a small residential tree surgeon
- a landscaping company
- an environmental consultancy
- an agricultural-only contractor

## Core Website Architecture

/
about/
services/
services/[slug]/
projects/
projects/[slug]/
plant-machinery/
contact/
privacy-policy/
404

## Primary Services

1. Tree Care
2. Site Clearance
3. Pipeline Reinstatement
4. Plant Hire
5. Agricultural Contracting
6. Wood Chipping
7. Telecoms Vegetation Management
8. Solar Farm Landscaping

## Content Architecture

Use structured Astro content/data where it creates a genuine long-term
benefit.

Required structured areas:

- Services
- Projects
- Plant & Machinery / Equipment

Services must NOT be implemented as eight duplicated Astro page files.

Individual services should resolve through one dynamic route:

/services/[slug]/

Projects should use:

/projects/[slug]/

## Relationships

The architecture should allow relationships such as:

Service
→ related projects
→ related equipment
→ related services
→ enquiry

Project
→ services delivered
→ equipment used
→ enquiry

Equipment
→ relevant services
→ relevant projects

Do not over-engineer these relationships.

Use Astro-native approaches and the installed Astro version as the
source of truth.

## Technical Principles

- Astro is the application framework.
- Lumos is the design-system foundation.
- Stacki will be used for visual refinement.
- Prefer static rendering.
- Avoid unnecessary JavaScript.
- Do not add React, Vue or Svelte unless there is a genuine technical
  requirement.
- Do not introduce Tailwind.
- Do not introduce another component library.
- Preserve Lumos accessibility conventions.
- Preserve Lumos token and styling conventions.
- Use existing Lumos components before creating custom equivalents.
- Custom Farrelly components must follow LUMOS.md conventions.

## Content Integrity

Never invent factual business claims for visual completeness.

Do not invent:

- certifications
- awards
- clients
- machinery models
- employee numbers
- project values
- years of experience
- safety records
- project results
- geographic coverage
- statistics
- accreditations
- testimonials

Unknown information should be identified as requiring client
confirmation.

Working layout copy may be used where necessary but must not imply
unverified facts.

## SEO

The site architecture must support:

- unique page titles
- unique meta descriptions
- semantic heading hierarchy
- one primary H1 per page
- crawlable service URLs
- crawlable project URLs
- internal linking
- canonical URLs
- structured metadata where appropriate
- sitemap generation
- useful alt text
- fast static pages

Important commercial/service content should not depend on client-side
JavaScript to become visible.

## Performance

Photography will be an important part of the website.

Use Astro's image capabilities and the existing Lumos Img component
appropriately.

Avoid unnecessary large files and unnecessary JavaScript.

Performance must remain a consideration throughout development rather
than an optimisation phase added at the end.
