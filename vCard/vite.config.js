import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },build: {
    rollupOptions: {
      external: ['icons/arrow-bar-up.svg','icons/arrow-bar-down.svg','icons/phone.svg','icons/bank.svg','icons/credit-card.svg'], // Add your SVG file path here
    },
  },
})
