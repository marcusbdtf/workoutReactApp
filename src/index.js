import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import { PublicClientApplication, EventType, CryptoUtils } from '@azure/msal-browser';

const codeVerifier = CryptoUtils.generateCodeVerifier(); // generate a random string
const codeChallenge = CryptoUtils.generateCodeChallenge(codeVerifier); // generate the corresponding challenge string

export const pca = new PublicClientApplication({
  auth:{
    clientId: 'ff534cd6-bff6-46af-83e5-48211dd64e13',
    authority: 'https://login.microsoftonline.com/common/',
    redirectUri: 'https://reactwebapp-mh.azurewebsites.net/.auth/login/aad/callback',
    codeChallenge,
    codeChallengeMethod: 'S256',
    extraQueryParameters: {
      code_verifier: codeVerifier 
    }
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system:{
    loggingOptions:{
      loggerCallback: (level, message, containsPII) => {
        console.log(message)
      },
      logLevel: 'Info',
    }
  }
})

pca.addEventCallback(event => {
  if (event.eventType === EventType.LOGIN_SUCCESS){
    console.log(event)
    pca.setActiveAccount(event.payload.account);
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App msalInstance={pca}/>
  </React.StrictMode>
);
