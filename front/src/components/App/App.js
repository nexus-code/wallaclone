import React, { Suspense } from 'react';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import Search from '../Search';
import Register from '../Register';
import Login from '../Login';
import AdEdit from '../AdEdit';
import AdDetail from '../AdDetail';
import * as config from '../../constants';
import NotFoundPage from '../404/NotFoundPage';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App({ user, ads, props }) {
  
  toast.configure(config.toastConfigure);

  return <div>
      <Suspense fallback={(<div>Loading</div>)}>
        <ToastContainer />
        <ErrorBoundary>
              <Switch>
                <Route path='/register' exact component={ Register } />
                <PrivateRoute path="/profile" exact component={ Register } />
                <Route path="/login" exact component={ Login } />
                <PrivateRoute path='/advert/create' exact component={ AdEdit } />
                <PrivateRoute path='/advert/edit/:id' exact component={ AdEdit } />
                <Route path='/advert/:id' exact component={ AdDetail } />
                <Route path='/advert/' exact component={ Search } />
                <Route path='/home' exact component={ Home } />
                <Route path='/' exact component={ Home } />
                <Route path='*' component={ NotFoundPage } />
              </Switch>
        </ErrorBoundary>
      </Suspense>
  </div>
}

export default App;