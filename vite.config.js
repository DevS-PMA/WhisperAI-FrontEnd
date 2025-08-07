import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace below with your repo name!
export default defineConfig({
  plugins: [react()],
  base: '/whisper-ai/', // <-- your GitHub repo name
})
