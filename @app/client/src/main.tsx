import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  ThemeProvider,
  QueryProvider,
  RouterProvider,
  FiltersProvider
} from '~/lib/providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <FiltersProvider>
          <RouterProvider />
        </FiltersProvider>
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>
);
