import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        manifesto: resolve(__dirname, 'manifesto/index.html'),
        oracle: resolve(__dirname, 'oracle/index.html'),
        rituals: resolve(__dirname, 'rituals/daily.html')
      }
    }
  },
  server: {
    open: '/manifesto/'
  }
});