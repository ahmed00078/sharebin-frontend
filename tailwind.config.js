/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                railway: {
                    50: '#f4f3ff',
                    100: '#ebe8ff',
                    200: '#d9d4ff',
                    300: '#bfb2ff',
                    400: '#a085ff',
                    500: '#8255ff',
                    600: '#7433ff',
                    700: '#6521eb',
                    800: '#551bc5',
                    900: '#4819a1',
                    950: '#2c0d6e',
                },
                dark: {
                    100: '#0a0a0a',
                    200: '#121212',
                    300: '#1a1a1a',
                    400: '#2a2a2a',
                    500: '#3a3a3a',
                }
            },
            backgroundImage: {
                'railway-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a1a3a 75%, #1a0a2a 100%)',
                'railway-card': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            },
            boxShadow: {
                'railway': '0 4px 32px rgba(130, 85, 255, 0.2)',
                'railway-lg': '0 8px 60px rgba(130, 85, 255, 0.3)',
            }
        },
    },
    plugins: [],
}
