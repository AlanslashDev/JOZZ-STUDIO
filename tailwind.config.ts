/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#050505',
          subtle: '#0D0D0E',
          elevated: '#111113',
          border: '#1E1E22',
        },
        foreground: {
          DEFAULT: '#F2F0EB',
          muted: '#8A8882',
          subtle: '#565450',
        },
        brand: {
          amber: '#E8A64C',
          amberHover: '#D49238',
          coral: '#FF5A3C',
          coralHover: '#E0472A',
          electric: '#00E5FF',
        },
        surface: {
          1: '#0F0F11',
          2: '#161619',
          3: '#1C1C20',
        }
      },
      fontFamily: {
        editorial: ['Fraunces', 'Georgia', 'serif'],
        display: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        '8xl': ['6rem', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        '9xl': ['8rem', { lineHeight: '0.90', letterSpacing: '-0.04em' }],
        '10xl': ['10rem', { lineHeight: '0.88', letterSpacing: '-0.05em' }],
        '11xl': ['12rem', { lineHeight: '0.88', letterSpacing: '-0.06em' }],
        '12xl': ['14rem', { lineHeight: '0.86', letterSpacing: '-0.06em' }],
      },
      letterSpacing: {
        tightest: '-0.06em',
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.18em',
        mega: '0.25em',
        ultra: '0.35em',
      },
      animation: {
        'marquee-left': 'marqueeLeft 40s linear infinite',
        'marquee-right': 'marqueeRight 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'line-expand': 'lineExpand 0.6s ease-out forwards',
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.35' },
        },
        lineExpand: {
          '0%': { width: '0%', opacity: '0' },
          '100%': { width: '100%', opacity: '1' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'grid-dark': 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      }
    },
  },
  plugins: [],
}
