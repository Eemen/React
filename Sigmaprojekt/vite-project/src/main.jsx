import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Moderne React 18 Rendering-Methode
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);