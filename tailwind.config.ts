import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // ← دي مهمة جدًا
  ],
  theme: {
    extend: {  animation: {
      'slide-in': 'slideIn 0.5s ease-out forwards', // تعريف الأنيميشن
    },
    keyframes: {
      slideIn: {
        '0%': { transform: 'scale(0)', opacity: '0' },
        '100%': { transform: 'scale(1)', opacity: '1' },
      },
    },},
  },
  plugins: [
    require('flowbite/plugin') // ← أضف دي
  ],
}
export default config
