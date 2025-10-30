// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
  site:'https://slavencer.github.io',
  base:'portfolio',
  trailingSlash: 'ignore',
  integrations: [react()],
});