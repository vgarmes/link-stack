import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSessionContext } from '../context/session-context';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useSessionContext();
  return <Route {...rest}>{user ? children : <Redirect to="/" />}</Route>;
};

export default PrivateRoute;
