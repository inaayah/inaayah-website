import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { legalPreview } from './scripts/legalPreview.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), legalPreview()],
})
