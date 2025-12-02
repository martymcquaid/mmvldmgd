import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/chipify/projects/5d92fbf4-6b93-4f0e-91d0-148cae20c272/preview',
  plugins: [react()],
  css: {
    // Ensure CSS is processed and injected correctly
    devSourcemap: true,
  },
  server: {
    port: 5230,
    host: true,
    strictPort: true,
    hmr: {
      // HMR will be proxied through our backend
      port: 5230,
    },
  },
})
