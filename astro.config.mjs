import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import favicons from 'astro-favicons';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jenkinsmichpa.com',
  output: 'static',
  integrations: [
    svelte(),
    favicons({
      name: 'Michael Jenkins',
      short_name: 'MJ',
      theme_color: '#fafafa',
      theme_color_dark: '#111111'
    }),
    sitemap()
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@skeletonlabs/skeleton-svelte', 'simple-icons']
    },
    optimizeDeps: {
      include: ['@skeletonlabs/skeleton-svelte']
    }
  }
});
