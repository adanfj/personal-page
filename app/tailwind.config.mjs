import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import { blogTheme1 } from './src/theme';
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette")
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts,astro,jsx,md,mdx,tsx,vue}'
		)
	],
	darkMode: "class",
	theme: {
		extend: {
			animation: {
				first: "moveVertical 30s ease infinite",
				second: "moveInCircle 20s reverse infinite",
				third: "moveInCircle 40s linear infinite",
				fourth: "moveHorizontal 40s ease infinite",
				fifth: "moveInCircle 20s ease infinite",
			},
			keyframes: {
				moveHorizontal: {
					"0%": {
						transform: "translateX(-50%) translateY(-10%)",
					},
					"50%": {
						transform: "translateX(50%) translateY(10%)",
					},
					"100%": {
						transform: "translateX(-50%) translateY(-10%)",
					},
				},
				moveInCircle: {
					"0%": {
						transform: "rotate(0deg)",
					},
					"50%": {
						transform: "rotate(180deg)",
					},
					"100%": {
						transform: "rotate(360deg)",
					},
				},
				moveVertical: {
					"0%": {
						transform: "translateY(-50%)",
					},
					"50%": {
						transform: "translateY(50%)",
					},
					"100%": {
						transform: "translateY(-50%)",
					},
				},
			},
		},
	},
	plugins: [addVariablesForColors, skeleton({
		themes: {
			preset: [{
				name: "wintry",
				enhancements: true
			}, {
				name: "gold-nouveau",
				enhancements: true
			}, {
				name: "seafoam",
				enhancements: true
			}], custom: [
				blogTheme1
			]
		}
	}),
		forms],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}
