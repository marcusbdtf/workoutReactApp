import React from "react";
import { Link } from "react-router-dom";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

import { useIsAuthenticated } from "@azure/msal-react";
import { AuthenticatedTemplate } from "@azure/msal-react";

const NavBar = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Workout Logbook
        </Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <AuthenticatedTemplate>
          <li className="nav-item">
            <Link className="nav-link" to="/add">
              Add Workout
            </Link>
          </li>
          </AuthenticatedTemplate>
        </ul>
        {isAuthenticated ? (
          <SignOutButton/>
        ) : (
          <SignInButton />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
