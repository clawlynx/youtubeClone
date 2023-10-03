import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="957215026837-98d7e9kitiudneknf90qcuinos45s4be.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
