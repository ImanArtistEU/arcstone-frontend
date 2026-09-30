import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/app.css';

// Smooth scroll handler for anchor links
document.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement | null;
  const link = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
  if (!link) return;

  const href = link.getAttribute('href');
  if (href && href.startsWith('#') && href.length > 1) {
    const element = document.getElementById(decodeURIComponent(href.slice(1)));
    if (element) {
      event.preventDefault();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
