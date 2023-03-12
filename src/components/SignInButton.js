import { useMsal } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";

const loginRequest = {
    scopes: ["user.read"],
    prompt: InteractionType.Popup,
};

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleSignIn = () => {
        instance.loginPopup({
            scopes: ['user.read']
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <button className="btn btn-primary" onClick={handleSignIn}>Sign In</button>
    )
}
