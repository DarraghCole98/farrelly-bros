// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/consts.ts";
import { isNoindexRoute } from "./src/utils/seo.ts";

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      filter: (page) => !isNoindexRoute(new URL(page).pathname),
    }),
  ],
  // Revolution Gothic (headings) and Mr Eaves XL Modern (body) are served
  // from Adobe Fonts (Typekit kit cbc6nnx) — see the stylesheet link in
  // BaseHead.astro. Adobe's license doesn't permit self-hosting these files,
  // so they aren't part of Astro's font pipeline like the previous Figtree.
  vite: { build: { cssTarget: "safari15.4" } },
});
