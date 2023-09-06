import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

createRoot(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
