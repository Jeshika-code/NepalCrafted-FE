/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
  'node_modules/flowbite-react/lib/esm/**/*.js',
  ],

  theme: {
    
    extend: {
      colors:{
        'button-orange':'#D94E28',
        'text-orange':'#F9744C',
        'color-grey':'#424242',
        'light-grey':'#eeeeee',
        'button-white':'	#FFFFF0',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}

