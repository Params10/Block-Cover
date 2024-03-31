import { Config, DAppProvider, Mumbai } from '@usedapp/core';
import React, { StrictMode } from 'react';
import "./index.css";
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const config: Config = {
  networks: [Mumbai],
};
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOMClient.createRoot(rootElement).render(
    <StrictMode>
      <DAppProvider config={config}>
      <BrowserRouter>
        <App />
    </BrowserRouter>      
    </DAppProvider>
    </StrictMode>,
  );
}
