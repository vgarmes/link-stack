import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, Login, Register, Error } from './pages';
import { Layout } from './components';

function App() {
  return (
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
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;