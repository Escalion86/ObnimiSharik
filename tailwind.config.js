module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
        18: '4.5rem',
        '-18': '-4.5rem',
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
        40: '10rem',
        48: '12rem',
      },
      maxWidth: {
        // 4: '1rem',
        // 8: '2rem',
        // 12: '3rem',
        // 16: '4rem',
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
      },
      spacing: {
        90: '22.5rem',
        100: '25rem',
      },
      height: {
        88: '22rem',
        100: '25rem',
      },
      wight: {
        84: '21rem',
        88: '22rem',
        100: '25rem',
        184: '',
      },
      opacity: {
        15: '15%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
