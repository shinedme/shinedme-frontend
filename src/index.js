import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginProvider from './context/useLogin';

import App from './App';
import BackUp from './component/utils/BackUp';
const { cryptoWaitReady } = require('@polkadot/util-crypto');

cryptoWaitReady().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <LoginProvider>
        <BrowserRouter>
          <BackUp>
            <App />
          </BackUp>
        </BrowserRouter>
      </LoginProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
