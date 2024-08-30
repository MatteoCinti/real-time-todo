import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  ThemeProvider,
  QueryProvider,
  RouterProvider,
  FiltersProvider
} from '~/lib/providers';
import { AuthProvider } from './lib/providers/auth-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <FiltersProvider>
          <AuthProvider>
            <RouterProvider />
          </AuthProvider>
        </FiltersProvider>
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>
);
