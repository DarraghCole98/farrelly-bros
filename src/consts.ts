/** Site name. Appended to every page title and used as `og:site_name`. */
export const SITE_NAME = "Farrelly Bros";
/**
 * Fallback meta description for pages that don't set their own.
 *
 * Placeholder derived only from the industry positioning confirmed in
 * docs/PROJECT.md — not approved marketing copy. Replace once real copy
 * is signed off.
 */
export const SITE_DESCRIPTION =
  "Farrelly Bros provide specialist arboriculture, vegetation management and contracting services.";
/**
 * Canonical origin. Resolves canonical URLs, social images, and the sitemap.
 *
 * TODO: production domain not yet confirmed. Left as a dev-safe placeholder
 * so builds and the sitemap keep working — replace before launch.
 */
export const SITE_URL = "http://localhost:4321";
/** BCP 47 locale tag used to format dates and numbers. TODO: confirm — still the Lumos scaffold default, not yet verified for Farrelly Bros. */
export const SITE_LOCALE = "en-US";
/**
 * Routes kept out of search results. Each is excluded from the sitemap and
 * served with a `robots: noindex, nofollow` tag, so the two can't disagree.
 *
 * Surrounding slashes are optional: `"/thanks"`, `"thanks"` and `"/thanks/"`
 * all match the same route.
 */
export const NOINDEX_ROUTES: string[] = ["/404", "/privacy-policy"];

/**
 * Business contact details, as confirmed via the Farrelly Bros.ie Facebook
 * page. `email` is @agriman.ie rather than @farrellybros.ie — worth
 * double-checking that's the address they actually want published, since
 * it doesn't match the site's own domain.
 */
export const SITE_CONTACT: {
  phone?: string;
  mobile?: string;
  email?: string;
  address?: string;
} = {
  phone: "046 924 0404",
  mobile: "087 351 7069",
  email: "info@agriman.ie",
  address: "Carnaross, Co. Meath, Ireland",
};

/** Social profile links. Empty until confirmed. */
export const SITE_SOCIAL: Array<{ label: string; href: string }> = [];

/**
 * Where the enquiry form posts.
 *
 * See docs/DECISIONS.md — Web3Forms, delivering to darragh@offgridstudio.ie
 * as a temporary destination until Farrelly Bros confirm their real inbox.
 */
export const FORM_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Web3Forms access key tied to the destination inbox above. Not a secret in
 * the traditional sense — it's designed to be embedded in public form HTML —
 * but it does control where submissions land, so it moves in lockstep with
 * FORM_ENDPOINT and the docs/DECISIONS.md entry.
 */
export const FORM_ACCESS_KEY = "55a0f22e-9f81-4ed9-bf09-a5db7c70f4fa";

/**
 * Google Analytics 4 measurement id (e.g. "G-XXXXXXXXXX"). Empty until
 * Farrelly Bros' GA4 property is created and shared.
 *
 * Left empty, `CookieConsent` and its gtag.js loader render nothing, so the
 * site ships with no analytics and no cookie banner — accurate to what
 * privacy-policy.astro currently states. Once set, both switch on together;
 * see docs/DECISIONS.md.
 */
export const GOOGLE_ANALYTICS_ID = "";

/**
 * Google Search Console HTML-tag verification code — just the token, not
 * the full `<meta>` tag (e.g. "abc123..." from
 * `<meta name="google-site-verification" content="abc123...">`). Search
 * Console verification sets no cookies, so unlike GA it renders unconditionally
 * and needs no consent.
 */
export const GOOGLE_SITE_VERIFICATION = "";
