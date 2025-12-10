import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';  // Correctly import createRoot from 'react-dom/client'
import App from './App';  // Do NOT include the '.tsx' extension
import './index.css';     // Import Tailwind CSS

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
