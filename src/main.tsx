import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { PrivyProvider } from '@privy-io/react-auth';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'flatpickr/dist/flatpickr.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      {process.env.PRVI_APP_ID && (
        <PrivyProvider appId={process.env.PRVI_APP_ID}>
          <App />
        </PrivyProvider>
      )}
    </Router>
  </React.StrictMode>,
);
