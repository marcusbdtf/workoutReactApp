import { PublicClientApplication } from "@azure/msal-browser";

export default class AuthService {
  constructor() {
    const config = {
      auth: {
        clientId: process.env.REACT_APP_CLIENT_ID,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "https://reactwebapp-mh.azurewebsites.net/.auth/login/aad/callback"
      },
      cache: {
        cacheLocation: 'localStorage',
      },
      system: {
        iframeTimeout: 6000
      }
    };

    this.myMsal = new PublicClientApplication(config);
    this.request = {
      scopes: ['user.read'],
    };

    this.idToken = "";
    this.accessToken = "";
  }

  login = async () => {
    try {
      const response = await this.myMsal.loginPopup(this.request);
      this.idToken = response.idToken;
      this.accessToken = response.accessToken;
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  logout = async () => {
    await this.myMsal.logoutRedirect();
  };

  getToken = async () => {
    try {
      const accounts = await this.myMsal.getAllAccounts();

      if (accounts.length === 0) throw new Error("login_required");

      const silentRequest = {
        scopes: this.request.scopes,
        account: accounts[0],
      };

      const authResult = await this.myMsal.acquireTokenSilent(silentRequest);

      return authResult.accessToken;
    } catch (error) {
      if (error.name === "InteractionRequiredAuthError") {
        const interactiveRequest = {
          scopes: this.request.scopes,
          loginHint: this.myMsal.getAccount().username,
        };

        const authResult = await this.myMsal.acquireTokenPopup(interactiveRequest);

        return authResult.accessToken;
      } else {
        console.log(error);
        throw error;
      }
    }
  };

  getMsalInstance = () => {
    return this.myMsal;
  };
}
