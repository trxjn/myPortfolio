import React from 'react';
import ReactDOM from 'react-dom/client';  // Import createRoot from 'react-dom/client'
import App from './App';  // Import your App component
import './index.css';     // Import Tailwind CSS

// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
