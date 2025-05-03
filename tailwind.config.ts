import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // ← دي مهمة جدًا
  ],
  theme: {
    extend: {  animation: {
      'fade-out': 'fadeOut 0.5s ease-out forwards', // تعريف الأنيميشن
      'fade-in': 'fadeIn 0.5s ease-out forwards', // تعريف الأنيميشن
    },
    keyframes: {
    
      fadeIn: {
        '0%': { transform: 'scale(0)', opacity: '0' },
        '100%': { transform: 'scale(1)', opacity: '1' },
      },
      fadeOut: {
        '0%': { transform: 'scale(1)', opacity: '1' },
        '100%': { transform: 'scale(0)', opacity: '0' },
      },
     
    },},
  },
  plugins: [
    require('flowbite/plugin') // ← أضف دي
  ],
}
export default config
