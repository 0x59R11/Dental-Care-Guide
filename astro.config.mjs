import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://0x59r11.github.io',
  base: process.env.BASE_PATH ?? '/Dental-Care-Guide',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'uk', 'de'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
