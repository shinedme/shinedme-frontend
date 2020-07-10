import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Poster from './component/Poster/Poster';

import Dash from './component/Dash/Dash';
import Upload from './component/Upload/Upload';
import Profile from './component/Profile/Profile';

import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Poster} />
      <Route exact path="/dash" component={Dash} />
      <Route exact path="/upload" component={Upload} />
      <Route exact path="/profile/:id" component={Profile} />
      <Route
        render={() => (
          <h1>
            Not found This page. Please go back to continue or you can contact
            us about the issue.
          </h1>
        )}
      />
    </Switch>
  );
}

export default App;
