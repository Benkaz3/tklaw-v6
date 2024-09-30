/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',  // Darker black
        secondary: '#e0e0e0', // Light gray for background areas
        accent: '#737373',  // Slightly lighter black for accents
        background: '#f0f0f0', // Softer white/gray for page backgrounds
        text: '#1c1c1c', // Dark gray for text for better readability
        muted: '#7f7f7f', // Muted gray for less important text
        buttonBg: '#21235d', // Muted dark red for button background
        navLinkAccent: '#be000c', // brighter red accent for navbar links
        secondaryButtonBg: '#535353', // Gray for secondary button background
        photoBg: '#D9D9D9', // light grey for headshot background
        whyUsBg: '#464646'
      },
      
      fontFamily: {
        primary: ['Be Vietnam Pro', 'sans-serif'],
        secondary: ['Georgia', 'serif'],
        logo: ['Georgia', 'sans-serif']
      },
      fontSize: {
        'h1': '2.25rem',  // 36px
        'h2': '1.75rem',  // 28px
        'h3': '1.375rem', // 22px
        'body': '1rem',   // 16px
        'caption': '0.75rem', // 12px
      },
      borderRadius: {
        'sm': '0.3125rem', // 5px
      },
      maxWidth: {
        'container-desktop': '75rem', // 1200px
        'container-tablet': '60rem',  // 960px
      },
      spacing: {
        'section-margin': '2.5rem', // 40px
        'card-padding': '1.25rem',  // 20px
        'button-padding': '0.625rem', // 10px
      },
    },
  },
  plugins: [],
}
