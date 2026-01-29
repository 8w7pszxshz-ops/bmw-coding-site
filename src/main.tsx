import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const rootElement = document.getElementById("root")!;

// Очищаем статический контент и рендерим React
rootElement.innerHTML = '';
createRoot(rootElement).render(<App />);