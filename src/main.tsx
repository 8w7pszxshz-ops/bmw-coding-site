import * as React from 'react';
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const rootElement = document.getElementById("root")!;

// Очищаем статический контент перед гидратацией
if (rootElement.innerHTML && rootElement.innerHTML.includes('<!-- Статический контент')) {
  // Гидратация - React подхватывает существующий HTML
  hydrateRoot(rootElement, <App />);
} else {
  // Fallback для dev режима
  import('react-dom/client').then(({ createRoot }) => {
    createRoot(rootElement).render(<App />);
  });
}