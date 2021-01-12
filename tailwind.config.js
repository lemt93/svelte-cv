module.exports = {
  purge: [
      './public/index.html',
      './src/**/*.svelte',
      './src/**/*.svx',
      './ssg/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'print': {'raw': 'print'},
      },
      spacing: {
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        'full': '100%'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
