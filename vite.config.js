import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // URLs inside index.html and assets will start with /whisper-ai/
  base: '/whisper-ai/',
  // Put the built site at dist/whisper-ai so the file truly lives at /whisper-ai/
  build: {
    outDir: 'dist/whisper-ai',   // <-- key change
    assetsDir: 'assets'          // default; OK to keep explicit
  }
})
