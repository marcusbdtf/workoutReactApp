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
      const pkceParams = {
        codeChallengeMethod: 'S256', // use SHA-256 hashing for code challenge
      };
      const response = await this.myMsal.loginPopup({
        ...this.request,
        authenticationParameters: pkceParams,
      });
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
