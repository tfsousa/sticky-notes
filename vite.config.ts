import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [react(), EnvironmentPlugin(['API_URL'])],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
