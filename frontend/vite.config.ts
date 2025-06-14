import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  const port = process.env.FRONTEND_PORT || 3000;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/styles/abstracts/index.scss' as *;`,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(port),
      watch: {
        usePolling: true,
      },
    },
    preview: {
      host: '0.0.0.0',
      port: Number(port),
    },
  };
});
