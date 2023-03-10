const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"dirma": "#96DECA",
			},
			fontFamily: {
                sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
                heading: ['var(--font-lexend)', ...defaultTheme.fontFamily.sans],
                body: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
            },
		},
	},
	plugins: [],
}
