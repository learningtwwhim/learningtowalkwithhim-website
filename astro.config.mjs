// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://learningtowalkwithhim.com',
  integrations: [mdx(), sitemap()],

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-heading',
      fallbacks: ['Georgia', 'serif'],
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      fallbacks: ['system-ui', 'sans-serif'],
      weights: [400, 500, 600, 700],
      styles: ['normal'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
