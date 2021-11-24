module.exports = {
  important: true,
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './blocks/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './helpers/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  theme: {
    extend: {
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
      },
      backgroundImage: (theme) => ({
        check: "url('/icons/check.svg')",
        radio: "url('/icons/radio.svg')",
        landscape: "url('/images/landscape/2.jpg')",
      }),
      colors: {
        header: '#4D9DC4',
        primary: '#26A3D4',
        secondary: '#4C8BF7',
        third: '#176D8F',
        bg: '#54889A',
        toxic: '#6ad424',
        hover: '#C8E3F4',
      },
      fontSize: {
        xxs: '.625rem',
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
        menu: '3.75rem',
        title: '3.80rem',
        18: '4.5rem',
        '-18': '-4.5rem',
        22: '5.5rem',
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
        6: '1.5rem',
        // 8: '2rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        22: '5.5rem',
        24: '6rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        48: '12rem',
        72: '18rem',
        76: '19rem',
        84: '21rem',
        88: '22rem',
        100: '25rem',
        112: '28rem',
        116: '29rem',
        120: '30rem',
        140: '35rem',
        160: '40rem',
        180: '45rem',
        200: '50rem',
        220: '55rem',
        228: '57rem',
        240: '60rem',
      },
      maxWidth: {
        // 4: '1rem',
        6: '1.5rem',
        // 12: '3rem',
        // 16: '4rem',
        20: '5rem',
        24: '6rem',
        // 32: '8rem',
        30: '7.5rem',
        40: '10rem',
        48: '12rem',
        60: '15rem',
        100: '25rem',
        120: '30rem',
        124: '31rem',
        128: '32rem',
        132: '33rem',
        140: '35rem',
        248: '62rem',
      },
      minHeight: {
        8: '2rem',
        20: '5rem',
        72: '18rem',
        100: '25rem',
        192: '46rem',
      },
      maxHeight: {
        18: '4.5rem',
        22: '5.5rem',
        200: '50rem',
        1000: '250rem',
      },
      cursor: {
        'zoom-in': 'zoom-in',
      },
      boxShadow: {
        light: '1px 5px 4px 0 rgba(0, 0, 0, 0.20)',
        medium: '1px 4px 5px 0 rgba(0, 0, 0, 0.30)',
        large: '1px 3px 6px 0 rgba(0, 0, 0, 0.40)',
        // sm: '0 3px 15px 0 rgba(0, 0, 0, 0.10)',
        active:
          '0 1px 3px 1px rgba(38, 163, 212, 0.5), 0 1px 2px 1px rgba(38, 163, 212, 0.3)',
        'medium-active': '0 1px 4px 5px rgba(38, 163, 212, 0.5)',
        primary: '0px 0px 8px 8px #26A3D4',
      },
      spacing: {
        15: '3.75rem',
        90: '22.5rem',
        100: '25rem',
      },
      height: {
        17: '4.25rem',
        22: '5.5rem',
        62: '15.5rem',
        68: '17rem',
        70: '17.5rem',
        82: '20.5rem',
        84: '21rem',
        88: '22rem',
        98: '24.5rem',
        100: '25rem',
        106: '26.5rem',
        112: '28rem',
        116: '29rem',
        118: '29.5rem',
        120: '30rem',
        128: '32rem',
        136: '34rem',
      },
      width: {
        17: '4.25rem',
        18: '4.5rem',
        22: '5.5rem',
        26: '6.65rem',
        34: '8.25rem',
        50: '12.5rem',
        84: '21rem',
        88: '22rem',
        100: '25rem',
      },
      opacity: {
        15: '15%',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  variants: {
    extend: {
      overflow: ['hover', 'focus'],
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      inset: ['checked'],
      zIndex: ['hover', 'active'],
    },
    backgroundColor: [
      'responsive',
      'hover',
      'focus',
      'group-hover',
      'group-focus',
    ],
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
    // boxShadow: ['responsive', 'hover', 'focus'],
    // transform: ['hover', 'responsive'],
  },
  plugins: [require('tailwindcss-nested-groups')],
  future: {
    purgeLayersByDefault: true,
  },
}
