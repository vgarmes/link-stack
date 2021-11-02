import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  Home,
  Login,
  Register,
  Error,
  Dashboard,
  PrivateRoute,
  Verify,
  ForgotPassword,
  ResetPassword,
  User,
} from './pages';
import { Layout } from './components';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/user/verify-email">
            <Verify />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/user/reset-password">
            <ResetPassword />
          </Route>
          <Route path="/:username">
            <User />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
