import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';

import { PanierProvider, UserProvider } from "Context";

ReactDOM.render(
  <React.StrictMode>
    <PanierProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PanierProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

