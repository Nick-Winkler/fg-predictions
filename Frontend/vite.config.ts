/// <reference types="vitest/config" />
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
  test: {
    // Unit/component tests only. Leaves e2e/*.spec.ts files to playwright.
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    // Absolute base URL so the api client's fetch works under Node (undici rejects
    // relative URLs) and MSW can intercept it.
    env: { VITE_API_BASE_URL: 'http://localhost' },
  },
})
