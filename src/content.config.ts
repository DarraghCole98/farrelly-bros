import { defineCollection, reference, z } from "astro:content";
import type { SchemaContext } from "astro:content";
import { glob } from "astro/loaders";

/** Page metadata overrides. Falls back to `title`/`summary` and site defaults when omitted. */
const seo = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  noindex: z.boolean().optional(),
});

/** A single capability within a service's capability list. */
const capability = z.object({
  title: z.string(),
  description: z.string().optional(),
});

/** A single question/answer pair in a service's FAQ. */
const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

/**
 * One site or project type a service applies to. A plain string shows just
 * the label; the object form adds a sentence of detail, which switches the
 * section from a label grid to a two-column tabbed layout.
 */
const applicationItem = z.union([
  z.string(),
  z.object({
    label: z.string(),
    text: z.string().optional(),
  }),
]);

/**
 * One step in how a service is actually carried out, start to finish. Takes
 * the schema's `image` helper so each step can carry its own photo — falls
 * back to the process section's shared image when omitted.
 */
const processStep = (image: SchemaContext["image"]) =>
  z.object({
    title: z.string(),
    description: z.string().optional(),
    image: image().optional(),
    imageAlt: z.string().optional(),
  });

/** A contextual call to action for a service. */
const cta = z.object({
  heading: z.string().optional(),
  text: z.string().optional(),
  label: z.string().optional(),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: ({ image }) =>
    z.object({
      /** Full service name, e.g. "Tree Care". */
      title: z.string(),
      /** Shorter name for constrained spaces such as nav or cards. */
      shortTitle: z.string().optional(),
      /** Small label shown above the title, e.g. "Service". */
      eyebrow: z.string().optional(),
      /** One or two sentence summary used on cards and as the SEO fallback description. */
      summary: z.string(),
      seo: seo.optional(),
      hero: z
        .object({
          /** Overrides `title` in the hero heading. */
          heading: z.string().optional(),
          intro: z.string().optional(),
          image: image().optional(),
          imageAlt: z.string().optional(),
        })
        .optional(),
      overview: z
        .object({
          heading: z.string().optional(),
          body: z.string().optional(),
          /** Short confirmations listed under the body, each with a tick. */
          points: z.array(z.string()).optional(),
          image: image().optional(),
          imageAlt: z.string().optional(),
        })
        .optional(),
      /** Why this service is worth giving to Farrelly Bros, as a tick list. */
      whyUs: z
        .object({
          heading: z.string().optional(),
          intro: z.string().optional(),
          points: z.array(z.string()).optional(),
          image: image().optional(),
          imageAlt: z.string().optional(),
        })
        .optional(),
      /** How a job of this kind runs, from first contact to leaving site. */
      process: z
        .object({
          eyebrow: z.string().optional(),
          heading: z.string().optional(),
          intro: z.string().optional(),
          image: image().optional(),
          imageAlt: z.string().optional(),
          steps: z.array(processStep(image)).optional(),
        })
        .optional(),
      capabilities: z.array(capability).optional(),
      /** Site/project/application types this service is relevant to. */
      applications: z.array(applicationItem).optional(),
      relatedEquipment: z.array(reference("equipment")).optional(),
      relatedProjects: z.array(reference("projects")).optional(),
      relatedServices: z.array(reference("services")).optional(),
      faq: z.array(faqItem).optional(),
      cta: cta.optional(),
    }),
});

const testimonial = z.object({
  quote: z.string(),
  author: z.string().optional(),
  role: z.string().optional(),
  /** Out of 5. Only shown when the rating is a confirmed, real review score. */
  rating: z.number().min(1).max(5).optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      client: z.string().optional(),
      location: z.string().optional(),
      sector: z.string().optional(),
      date: z.coerce.date().optional(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      gallery: z.array(image()).optional(),
      relatedServices: z.array(reference("services")).optional(),
      relatedEquipment: z.array(reference("equipment")).optional(),
      challenge: z.string().optional(),
      scopeOfWorks: z.string().optional(),
      solution: z.string().optional(),
      result: z.string().optional(),
      testimonial: testimonial.optional(),
      seo: seo.optional(),
    }),
});

/** A single spec row, since fields differ machine to machine. */
const specification = z.object({
  label: z.string(),
  value: z.string(),
});

const equipment = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/equipment" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      /** Equipment grouping, e.g. "Chippers", "Excavators". */
      category: z.string(),
      manufacturer: z.string().optional(),
      model: z.string().optional(),
      summary: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      gallery: z.array(image()).optional(),
      capabilities: z.array(z.string()).optional(),
      specifications: z.array(specification).optional(),
      relatedServices: z.array(reference("services")).optional(),
      relatedProjects: z.array(reference("projects")).optional(),
      seo: seo.optional(),
    }),
});

export const collections = { services, projects, equipment };
