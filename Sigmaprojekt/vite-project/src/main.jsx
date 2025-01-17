import React from 'react';
import ReactDOM from 'react-dom/client';  // Import `react-dom/client` instead
import './index.css';
import App from './App';

// Create a root container using createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use root.render instead of ReactDOM.render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);