import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
// @ts-expect-error - eslintPlugin is not typed
import eslintPlugin from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

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
        target:
          process.env.NETWORK_ENV === 'docker-compose'
            ? 'http://api:4000'
            : 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/api/, ''),
        secure: false
      }
    }
  }
});
