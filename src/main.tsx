import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/app.css';
import './styles/arcstone-tokens.css';

// Global navigation handler for links inside static HTML templates
(window as unknown as { navigateTo: (event: Event | null, path: string) => void }).navigateTo = (
  event: Event | null,
  path: string
) => {
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

document.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement | null;
  const link = target?.closest('a') as HTMLAnchorElement | null;
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href) return;

  // Anchor smooth scrolling
  if (href.startsWith('#') && href.length > 1) {
    const element = document.getElementById(decodeURIComponent(href.slice(1)));
    if (element) {
      event.preventDefault();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return;
  }

  // Internal routes in static templates (e.g. /platform, /start-ups)
  if (
    href.startsWith('/') &&
    !href.startsWith('//') &&
    !href.startsWith('/wf/') &&
    !href.startsWith('/favicon') &&
    !link.target &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey
  ) {
    event.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
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
