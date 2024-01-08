import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
  server: {
    host: 'localhost',
    port: 4000,
    proxy: {
      '/management': {
        target: 'http://localhost:4001',	// Real Request IP https://www.cnblogs.com/baibaisheng/p/16123221.html
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/management/, '')
      },
      '/api': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
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
});
