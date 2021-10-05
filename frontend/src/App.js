import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from './pages';
import { Layout } from './components';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
