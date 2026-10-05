import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Todo en un único HTML (JS, CSS, fuentes y audio incrustados) para que se pueda
// abrir sin servidor y publicar como página suelta, igual que el resto del repo.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { assetsInlineLimit: 100_000_000, chunkSizeWarningLimit: 5000 },
})
