import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '~/lib/providers/theme-provider';

import App from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
