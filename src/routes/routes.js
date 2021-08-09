import React from 'react';
import routes from 'routes';
import { RouteProps, Route as ReactDOmRoute, Redirect, useLocation } from 'react-router-dom';

import { useAuth } from '../Context/AuthContext';

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();
  const location = useLocation();


  return (
    <ReactDOmRoute
      {...rest}
      render={() => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{
            pathname: isPrivate ? '/' : '/admin/index',
            state: { from: location }
          }} />
        )
      }} />
  );
}

export default Route;