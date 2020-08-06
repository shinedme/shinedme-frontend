import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useSubstrate } from './substrate-lib';

import Poster from './component/Poster/Poster';
import Dash from './component/Dash/Dash';
import Upload from './component/Upload/Upload';
import Profile from './component/Profile/Profile';
import Header from './component/Header/Header';
import Login from './component/Landing/Login';
import Editor from './component/Editor/Editor';

import './App.css';

export default () => {
  const { created_name } = useSubstrate();
  let routes = (
    <Switch>
      <Route exact path="/" component={Poster} />
      <Route exact path="/login" component={Login} />
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
  if (created_name) {
    routes = (
      <>
        <Header me={created_name} />
        <Switch>
          <Route exact path="/" component={Poster} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dash" component={Dash} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/editor" component={Editor} />
          <Route
            render={() => (
              <h1>
                Not found This page. Please go back to continue or you can
                contact us about the issue.
              </h1>
            )}
          />
        </Switch>
      </>
    );
  }
  return <>{routes}</>;
};
