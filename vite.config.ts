import { defineConfig } from 'vite'
import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'
import { fileURLToPath } from 'url'

export default defineConfig({
  base: '/sticky-notes/',
  plugins: [react(), EnvironmentPlugin(['API_URL'])],
  define: {
    'process.env': process?.env ?? {}
  },
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
