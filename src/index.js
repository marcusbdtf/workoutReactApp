import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import AuthService from './AuthService';

const authService = new AuthService();

//Call login method to authenticate user & fetch tokens
authService.login().then(() => {
  const msalInstance = authService.getMsalInstance();

  //Render app after the user is authenticated
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App msalInstance={msalInstance} />
    </React.StrictMode>
  );
});
