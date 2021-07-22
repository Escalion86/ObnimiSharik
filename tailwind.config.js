module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './blocks/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        header: '#4D9DC4',
        primary: '#26A3D4',
        secondary: '#4C8BF7',
        third: '#176D8F',
        bg: '#54889A',
        toxic: '#6ad424',
        hover: '#C8E3F4',
      },
      fontFamily: {
        futuraDemi: ['Futura PT Demi', 'sans-serif'],
        futura: ['Futura PT Book', 'sans-serif'],
      },
      width: {
        phoneV: '300px',
        phoneH: '420px',
        tablet: '620px',
        laptop: '940px',
        desktop: '1120px',
      },
      screens: {
        phoneV: '320px',
        phoneH: '480px',
        tablet: '640px',
        laptop: '960px',
        desktop: '1200px',
      },
      inset: {
        menu: '3.70rem',
        title: '3.80rem',
        18: '4.5rem',
        '-18': '-4.5rem',
        15: '3.75rem',
      },
      rotate: {
        '-15': '-15deg',
        15: '15deg',
      },
      animation: {
        'pulse-light': 'pulse-light 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-light': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
      },
      minWidth: {
        // 4: '1rem',
        // 8: '2rem',
        // 12: '3rem',
        // 16: '4rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        48: '12rem',
      },
      maxWidth: {
        // 4: '1rem',
        // 8: '2rem',
        // 12: '3rem',
        // 16: '4rem',
        // 32: '8rem',
        40: '10rem',
        48: '12rem',
      },
      minHeight: {
        100: '25rem',
        192: '46rem',
      },
      cursor: {
        'zoom-in': 'zoom-in',
      },
      boxShadow: {
        light: '0 5px 10px 0 rgba(0, 0, 0, 0.20)',
        medium: '0 3px 15px 0 rgba(43, 43, 43, 0.50)',
        // sm: '0 3px 15px 0 rgba(0, 0, 0, 0.10)',
        active:
          '0 1px 3px 1px rgba(76, 29, 149, 0.4), 0 1px 2px 1px rgba(76, 29, 149, 0.3)',
      },
      spacing: {
        90: '22.5rem',
        100: '25rem',
      },
      height: {
        22: '5.5rem',
        88: '22rem',
        100: '25rem',
      },
      wight: {
        34: '8.25rem',
        84: '21rem',
        88: '22rem',
        100: '25rem',
      },
      opacity: {
        15: '15%',
      },
    },
  },
  variants: {
    extend: { overflow: ['hover', 'focus'] },
    // boxShadow: ['responsive', 'hover', 'focus'],
    // transform: ['hover', 'responsive'],
  },
  plugins: [],
}
