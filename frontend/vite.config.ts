import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@core': resolve(__dirname, 'src/core'),
      '@data': resolve(__dirname, 'src/data'),
      '@domain': resolve(__dirname, 'src/domain'),
      '@presentation': resolve(__dirname, 'src/presentation'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
