/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				sourceSans: ["source-sans", "sans-serif"],
			},
		},
	},
	plugins: [],
};
