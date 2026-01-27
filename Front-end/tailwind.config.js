/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0F172A', // Deep Ocean Blue
                    light: '#334155',
                    dark: '#020617',
                },
                secondary: {
                    DEFAULT: '#F59E0B', // Amber Gold
                    hover: '#D97706',
                },
                background: {
                    DEFAULT: '#F8FAFC', // Soft Paper
                    dark: '#0F172A'
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    dark: '#1E293B'
                },
                text: {
                    main: '#0F172A',
                    muted: '#64748B',
                    light: '#F1F5F9'
                }
            },
            fontFamily: {
                serif: ['Merriweather', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '1.5rem',
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1280px',
                    '2xl': '1440px',
                },
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)',
            }
        },
    },
    plugins: [],
}
