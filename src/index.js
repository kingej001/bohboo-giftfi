import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { WalletAdapterProvider } from './WalletAdapterProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WalletAdapterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WalletAdapterProvider>
  </React.StrictMode>
);