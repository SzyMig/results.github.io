/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this if your file structure is different
    // Add any other paths that may include Tailwind CSS classes
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

