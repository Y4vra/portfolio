import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site:'https://y4vra.github.io',
  base:'portfolio',
  trailingSlash: 'ignore',
  integrations: [react()],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});