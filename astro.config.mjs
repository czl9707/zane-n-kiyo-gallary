// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  site: "https://kiyo-n-zane.com",
  trailingSlash: "ignore",
  compressHTML: true,
  env: {
    schema: {
      ADMIN_URL: envField.number({ context: "server", access: "secret" }),
      ADMIN_APIKEY: envField.string({ context: "server", access: "secret" }),
    }
  }
});