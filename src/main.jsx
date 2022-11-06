import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
// dev-7vohz2nv.us.auth0.com
// gFzcqvM7aZxnKMXoLSxgwaVwMI74Iltv

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-7vohz2nv.us.auth0.com"
      clientId="gFzcqvM7aZxnKMXoLSxgwaVwMI74Iltv"
      redirectUri={"https://github-users-amk.netlify.app"}
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
);
