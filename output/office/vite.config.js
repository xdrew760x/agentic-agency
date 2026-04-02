import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@babylonjs/core', '@babylonjs/gui', '@babylonjs/materials'],
  },
  build: {
    target: 'esnext',
  },
  server: {
    open: false,
    host: '0.0.0.0',
    proxy: {
      // Proxy /api/* → office event server on :5174
      '/api': {
        target:  'http://localhost:4001',
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
