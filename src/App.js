import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import AddWorkoutPage from './components/AddWorkoutPage';
import EditWorkoutPage from './components/EditWorkoutPage';
import AuthService from './components/AuthService';
import { useEffect } from 'react';
import { MsalProvider, useMsal, useIsAuthenticated } from '@azure/msal-react';
import { InteractionRequiredAuthError } from 'msal';


const authService = new AuthService();

function App() {
  return (
    <MsalProvider instance={authService.myMsal}>
      <Router>
        <Pages/>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddWorkoutPage />} />
          <Route path="/edit/:id" element={<EditWorkoutPage />} />
        </Routes>
      </Router>
    </MsalProvider>
  );
}

const Pages = () => {
  const {instance} = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(()=>{
    if (!isAuthenticated){
      instance.ssoSilent({
        scopes:['user.read'],
        loginHint: ""
      }).then((response) => {
        instance.setActiveAccount(response.account);
      }).catch((error) => {
        console.log(error)
        if(error instanceof InteractionRequiredAuthError){
          instance.loginRedirect({
            scopes:['user.read'],
          });
      }
      });
    }
  })
}

export default App;
