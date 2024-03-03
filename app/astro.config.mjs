import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";

// import compress from 'astro-compress';
// import purgecss from 'astro-purgecss';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import svelte from "@astrojs/svelte";

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
  integrations: [tailwind(), react(), svelte(),mdx()]
});