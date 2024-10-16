// src/App.js
import React from "react";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Home from "./components/Home";

function App({ signOut, user }) {
  return (
    <div>
      <Home user={user} signOut={signOut} /> {/* Pass signOut as a prop */}
    </div>
  );
}

export default withAuthenticator(App);
