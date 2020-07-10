import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import BackUp from './component/utils/BackUp';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <BackUp>
        <App />
      </BackUp>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
