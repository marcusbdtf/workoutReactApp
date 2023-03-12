import * as Msal from '@azure/msal-browser';

export default class AuthService {
  constructor() {
    const config = {
      auth: {
        clientId: process.env.REACT_APP_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AUTHORITY}`,
      },
    };

    this.myMsal = new Msal.PublicClientApplication(config);
    this.request = {
      scopes: ['user.read'],
    };

    this.idToken = '';
    this.accessToken = '';
  }

  login = async () => {
    try {
      const response = await this.myMsal.loginPopup(this.request);
      this.idToken = response.idToken;
      this.accessToken = response.accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  getMsalInstance = () => {
    return this.myMsal;
  };
}
