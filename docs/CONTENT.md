# Farrelly Bros Website Content Architecture

## Sitemap

### Home
/

### About
/about/

### Services
/services/

### Individual Services
/services/tree-care/
/services/site-clearance/
/services/pipeline-reinstatement/
/services/plant-hire/
/services/agricultural-contracting/
/services/wood-chipping/
/services/telecoms-vegetation-management/
/services/solar-farm-landscaping/

### Projects
/projects/

### Individual Project
/projects/[slug]/

### Plant & Machinery
/plant-machinery/

### Contact
/contact/

### Privacy
/privacy-policy/

### Error
404

--------------------------------------------------
HOME
--------------------------------------------------

Purpose:

Introduce Farrelly Bros, establish capability quickly and direct visitors
towards services, proof of work and enquiry.

Suggested structure:

01. Hero

Strong visual introduction.

Communicate specialist contracting capability rather than only tree care.

Primary CTA:
Explore Our Services

Secondary CTA:
Discuss a Project

02. Capability / Sector Strip

A concise visual introduction to the company's areas of expertise.

Potential categories:

Arboriculture
Vegetation Management
Infrastructure
Land Management
Specialist Plant

Final terminology should be validated against actual company services.

03. Company Introduction

Large statement introducing Farrelly Bros.

The section should communicate experience, equipment and the scale of
work undertaken.

04. Services

Strong visual service overview.

Services:

Tree Care
Site Clearance
Pipeline Reinstatement
Plant Hire
Agricultural Contracting
Wood Chipping
Telecoms Vegetation Management
Solar Farm Landscaping

May show a curated subset followed by "View All Services" if showing all
eight harms hierarchy.

05. Featured Project

One substantial project/case study feature.

Large photography.

Include relevant service links.

Do not fabricate a project simply to populate the section.

The section can remain structurally ready until real content is supplied.

06. Plant & Machinery

Demonstrate physical capability.

Focus on the equipment and machinery that enable specialist work.

Link to Plant & Machinery.

07. Sectors / Applications

Potential sectors subject to client confirmation:

Infrastructure
Construction
Utilities
Telecommunications
Renewable Energy
Agriculture
Commercial Land

08. Safety / Delivery

Commercial reassurance around professional project delivery.

Do not claim certifications or safety statistics until verified.

09. Selected Projects

Additional project cards when content becomes available.

10. Final CTA

Clear enquiry section.

--------------------------------------------------
ABOUT
--------------------------------------------------

01. Hero
02. Company introduction
03. Company background/history
04. Experience and capability
05. Approach to projects
06. Plant/machinery capability
07. Safety and professionalism
08. Sectors served
09. CTA

Only verified company-history information should be published.

--------------------------------------------------
SERVICES INDEX
--------------------------------------------------

01. Hero / introduction
02. Complete services grid
03. Capability statement
04. Project proof where available
05. CTA

Every service links to its own crawlable service page.

--------------------------------------------------
SERVICE PAGE TEMPLATE
--------------------------------------------------

All eight services share one reusable architecture.

The template should support optional sections so pages do not need empty
content blocks.

Suggested structure:

01. Service Hero

- eyebrow
- service title
- concise introduction
- hero image
- enquiry CTA where appropriate

02. Service Overview

Explain the service and typical requirement it solves.

03. Capabilities

Structured list/grid of activities within the service.

04. Applications

Types of sites, projects or scenarios for which the service is relevant.

05. Image Feature

Large project/service imagery.

06. Plant & Equipment

Relevant machinery/equipment relationships.

07. Why Farrelly Bros

Service-specific reasons the company is suitable for this work.

Do not use generic marketing claims unless supportable.

08. Featured Project

Relevant case study if available.

Optional.

09. FAQ

Service-specific questions where genuinely useful.

Optional.

10. Related Services

Relevant internal links.

11. CTA

Discuss a Project / Request a Quote.

--------------------------------------------------
SERVICES
--------------------------------------------------

### Tree Care

Known positioning:

Professional arboriculture and tree-care service.

Potential subject areas requiring client verification/details:

- felling
- pruning
- hazard removal
- difficult removals
- storm damage
- commercial arboriculture
- specialist equipment

### Site Clearance

Known positioning:

Vegetation and scrub clearance to prepare sites for development or other
works.

Potential subject areas:

- scrub clearance
- tree clearance
- vegetation removal
- mulching
- stump removal
- development sites
- infrastructure sites

### Pipeline Reinstatement

Known positioning:

Landscape/land reinstatement following pipeline works.

Potential subject areas:

- corridor reinstatement
- ground restoration
- vegetation reinstatement
- agricultural land
- infrastructure projects

### Plant Hire

Known positioning:

Provision of specialist plant and machinery.

Exact fleet, equipment, operator availability and hire terms must be
confirmed.

### Agricultural Contracting

Known positioning:

Machinery-led agricultural and land contracting.

Exact services must be confirmed with Farrelly Bros.

### Wood Chipping

Known positioning:

Specialist wood/timber chipping.

Exact machinery, material sizes, processing capabilities and disposal
arrangements must be confirmed.

### Telecoms Vegetation Management

Known positioning:

Vegetation management around telecoms infrastructure.

Potential subject areas:

- access routes
- mast compounds
- tree/vegetation clearance
- ongoing vegetation management
- difficult locations

Exact scope must be confirmed.

### Solar Farm Landscaping

Known positioning:

Vegetation and landscaping/land-management services associated with
solar farms.

Potential subject areas:

- grass control
- scrub management
- site access
- boundaries
- vegetation maintenance
- initial clearance

Exact scope must be confirmed.

--------------------------------------------------
PROJECTS
--------------------------------------------------

Projects index:

01. Hero/introduction
02. Project listing/filtering if genuinely required
03. CTA

Project detail:

01. Hero
02. Project overview
03. Challenge/context
04. Scope of works
05. Services delivered
06. Machinery/equipment
07. Photography/gallery
08. Result
09. Related services
10. CTA

Project data should potentially support:

title
slug
location
client
sector
date
summary
hero image
gallery
services
equipment
scope
challenge
solution
result
testimonial
SEO

Not all fields should be mandatory.

Do not invent missing project information.

docs/templates/project.md is the authoring template for a single project
write-up, with every field from the projects schema explained inline. Copy
it into src/content/projects/ as real project information becomes
available — the site is built to take hundreds of these.

--------------------------------------------------
PLANT & MACHINERY
--------------------------------------------------

Purpose:

Demonstrate Farrelly Bros' physical capability and specialist resources.

Plant & Machinery is distinct from Plant Hire.

Plant Hire is a commercial service.

Plant & Machinery is a capability/credibility area showing the equipment
available to the business.

Possible structure:

01. Hero
02. Equipment introduction
03. Equipment categories
04. Equipment listing
05. Related services
06. Selected project applications
07. CTA

Equipment structured data may support:

name
slug
category
manufacturer
model
short description
image
gallery
capabilities
relevant services
related projects

Exact manufacturer/model/specification details must not be invented.

--------------------------------------------------
CONTACT
--------------------------------------------------

01. Hero
02. Primary contact information
03. Enquiry form
04. Service selector
05. Project location
06. Project details
07. Additional contact methods

Suggested form fields:

Name
Company
Email
Telephone
Service required
Project location
Project details

Do not implement a backend form handler until the deployment/form
strategy is explicitly chosen.

--------------------------------------------------
SEO
--------------------------------------------------

Each service should target its own search intent.

Avoid keyword stuffing.

Service pages should contain genuinely useful content around:

- what the service is
- what Farrelly Bros provides
- applications
- capabilities
- relevant equipment
- relevant projects
- enquiry

SEO copy should remain natural and credible.
