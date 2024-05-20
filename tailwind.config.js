/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    extend: {
      colors: {
          primary:"rgba(var(--primary))",
          secondary:'rgba(var(--secondary))',
          travello_notify:'rgba(var(--travello_notify))'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

