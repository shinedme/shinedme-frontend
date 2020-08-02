import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SubstrateContextProvider } from './substrate-lib';

import App from './App';
import BackUp from './component/utils/BackUp';

ReactDOM.render(
  <React.StrictMode>
    <SubstrateContextProvider>
      <BrowserRouter>
        <BackUp>
          <App />
        </BackUp>
      </BrowserRouter>
    </SubstrateContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
