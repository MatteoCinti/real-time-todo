/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
// @ts-expect-error - eslintPlugin is not typed
import eslintPlugin from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

const { VITE_BACKEND_URL } = loadEnv('', process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.tsx']
    })
  ],
  server: {
    fs: {
      cachedChecks: false
    },
    proxy: {
      '/api': {
        target: VITE_BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/api/, ''),
        secure: false
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
