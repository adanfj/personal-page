// @ts-check
import { join } from 'path';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import { blogTheme1 } from './src/theme';

/** @type {import('tailwindcss').Config} */
export default {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		// 3. Append the path to the Skeleton package
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts,astro,jsx,md,mdx,tsx,vue}'
		)
	],
	theme: {
		extend: {},
	},
	plugins: [
    skeleton({
      themes: { preset: [ {
        name:"wintry",
        enhancements:true
      },{
		name:"gold-nouveau",
		enhancements:true
	  },{
		name:"seafoam",
		enhancements:true
	  } ], custom:[
		blogTheme1
	  ] }
    }),
    forms
  ]
}
