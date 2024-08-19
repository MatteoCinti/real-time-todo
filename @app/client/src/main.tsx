import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider, QueryProvider } from '~/lib/providers';

import App from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>
);
