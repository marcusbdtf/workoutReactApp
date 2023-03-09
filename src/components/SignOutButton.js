import { useMsal } from "@azure/msal-react";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleSignOut = () => {
    instance.logout();
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};
