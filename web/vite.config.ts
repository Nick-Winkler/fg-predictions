import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7016',
        changeOrigin: true,
        secure: false, // accept the local dev cert on the Node->.NET hop
      },
    },
  },
})
