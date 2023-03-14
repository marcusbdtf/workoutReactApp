import { PublicClientApplication } from "@azure/msal-browser";

export default class AuthService {
  constructor() {
    const config = {
      auth: {
        clientId: "bc05b57c-a494-4023-baa7-548011196461",
        authority: `https://login.microsoftonline.com/5b679921-53f7-4642-a251-8a603608d21c`,
        redirectUri: "https://reactwebapp-mh.azurewebsites.net/.auth/login/aad/callback",
        responseType: "id_token",
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
      await this.myMsal.loginRedirect(this.request);
    } catch (error) {
      console.log(error);
    }
  };
  

  logout = async () => {
    await this.myMsal.logout();
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
