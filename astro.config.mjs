// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import icon from 'astro-icon';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // site: 'https://',
  integrations: [
    icon({
      include: {
        ri: ['alert-line', 'home-4-fill'],
      },
      iconDir: 'src/assets/icons',
    }),
    react({ include: ['**/react/*'] }),
    sitemap(),
  ],
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
});
