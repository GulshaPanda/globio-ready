import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Vite = the tool that runs the app on your laptop and builds it for the web.
// We switch on two helpers: React (the screens) and Tailwind (the styling).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
