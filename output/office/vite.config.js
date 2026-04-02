import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@babylonjs/core', '@babylonjs/gui', '@babylonjs/materials'],
  },
  build: {
    target: 'esnext',
  },
  server: {
    proxy: {
      // Proxy /api/* → office event server on :5174
      '/api': {
        target:  'http://localhost:5174',
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
