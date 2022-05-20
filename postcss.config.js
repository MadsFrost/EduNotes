let tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env'),
    {
      'tailwindcss/nesting': {}
    },
    tailwindcss('tailwind.config.js'),
    {
      autoprefixer: {}
    }
  ]
};