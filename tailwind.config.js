/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './dist/*.html',
    './dist/**/*.js',
    './dev/*.html',
    './dev/**/*.js',
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
