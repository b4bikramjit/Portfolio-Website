/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./public/index.html"
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				border: "#1e293b",
				input: "#1e293b",
				ring: "#0ea5e9",
				background: "#020617", // Deep Navy/Black
				foreground: "#e2e8f0", // Slate-200
				primary: {
					DEFAULT: "#0ea5e9", // Sky Blue
					foreground: "#020617",
				},
				secondary: {
					DEFAULT: "#0f172a", // Lighter Navy (Card bg)
					foreground: "#e2e8f0",
				},
				destructive: {
					DEFAULT: "#ef4444",
					foreground: "#f8fafc",
				},
				muted: {
					DEFAULT: "#1e293b",
					foreground: "#94a3b8",
				},
				accent: {
					DEFAULT: "#14b8a6", // Teal
					foreground: "#020617",
				},
				popover: {
					DEFAULT: "#020617",
					foreground: "#e2e8f0",
				},
				card: {
					DEFAULT: "#0f172a",
					foreground: "#e2e8f0",
				},
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};