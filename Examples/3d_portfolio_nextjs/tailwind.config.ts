import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-text)",
        'th-text': 'var(--color-text)',
        'th-muted': 'var(--color-text-muted)',
        'th-surface': 'var(--color-surface)',
        'th-surface-alt': 'var(--color-surface-alt)',
        'th-border': 'var(--color-border)',
        'th-input': 'var(--color-input)',
        'th-placeholder': 'var(--color-placeholder)',
        // Keep originals for backward compat
        'white-50': '#d9ecff',
        'black-50': '#1c1c21',
        'black-100': '#0e0e10',
        'black-200': '#282732',
        'blue-50': '#839cb5',
        'blue-100': '#2d2d38',
      },
         screens: {
        'xxl': '1800px', 
        '3xl': '2100px',
        'mobile': '475px',
      },
    },
  },
  plugins: [],
} satisfies Config;