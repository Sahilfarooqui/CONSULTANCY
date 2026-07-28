import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Capture install prompt as early as possible (Android Chrome)
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.__r2sDeferredPrompt = e;
  window.dispatchEvent(new Event('r2s-pwa-ready'));
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL || ''}/service-worker.js`)
      .then((reg) => {
        reg.update().catch(() => undefined);
      })
      .catch(() => undefined);
  });
}

reportWebVitals();
