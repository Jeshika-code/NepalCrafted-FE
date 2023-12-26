/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins:{
  //   preflight:false,
  // },
  content: ["./src/**/*.{html,js}",
  'node_modules/flowbite-react/lib/esm/**/*.js',
  ],

  theme: {
   
    extend: {
      colors:{
        'button-orange':'#D94E28',
        'text-orange':'#F9744C',
        'color-grey':'#424242',
        'light-grey':'#f0f0f0',
        'light-orange':'#ffcc99',
        'orange':'#ff6347',
        'button-white':'	#FFFFF0',
        'light-black':'#636363'
      },
     
    },
  },
  plugins: [require('flowbite/plugin')],
}

