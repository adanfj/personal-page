import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";
import compress from 'astro-compress';
import purgecss from 'astro-purgecss';
// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    ssr: {
      noExternal: ['@skeletonlabs/skeleton/styles']
    }
  },
  integrations: [tailwind(), svelte(), mdx(), purgecss(), compress()]
});