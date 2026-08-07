import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Import plugin Tailwind v4

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Daftarkan di sini agar aktif di Vite
  ],
})