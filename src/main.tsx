// Fix timer binding issue in WebContainer environment
if (typeof globalThis !== 'undefined' && typeof globalThis.setTimeout === 'function') {
  globalThis.setTimeout = globalThis.setTimeout.bind(globalThis);
}
if (typeof globalThis !== 'undefined' && typeof globalThis.setInterval === 'function') {
  globalThis.setInterval = globalThis.setInterval.bind(globalThis);
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);