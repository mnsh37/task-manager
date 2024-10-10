// src/App.js
import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from './components/Home';

function App({ signOut, user }) {
  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={signOut}>Sign out</button>
      <Home user={user} />
    </div>
  );
}

export default withAuthenticator(App);
