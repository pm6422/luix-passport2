import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: 'localhost',
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/open-api': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/management': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/management/, '')
      },
      '/swagger-ui': {
        target: 'http://localhost:4001',
        changeOrigin: true
      },
      '/v3/api-docs': {
        target: 'http://localhost:4001',
        changeOrigin: true
      }
    }
  }
})
