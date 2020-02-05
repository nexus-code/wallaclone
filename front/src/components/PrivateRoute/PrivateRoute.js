import React from 'react';
import { Redirect, Route } from 'react-router-dom';

//thanks to 

const PrivateRoute = ({ authorized, ...props }) =>
  authorized ? <Route {...props} /> : <Redirect to="/login" />;

export default PrivateRoute;
