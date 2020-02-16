import React, { Suspense } from 'react';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import Search from '../Search';
import AdEdit from '../AdvertEdit';
import Register from '../Register';
import AdDetail from '../AdvertDetail';
import ResetPasswd from '../ResetPasswd';
import * as config from '../../constants';
import PrivateRoute from '../PrivateRoute';
import RecoverPasswd from '../RecoverPasswd';
import NotFoundPage from '../404/NotFoundPage';
import { ConfirmProvider } from 'material-ui-confirm';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App({ user, adverts, props }) {
  
  toast.configure(config.toastConfigure);

  return <div>
      <Suspense fallback={(<div>Loading</div>)}>
        <ConfirmProvider>
          <ToastContainer />
          <ErrorBoundary>
                <Switch>
                  <Route path='/register' exact component={ Register } />
                  <Route path="/login" exact component={ Login } />
                  <PrivateRoute path="/profile" exact component={ Register } />
                  <PrivateRoute path='/advert/create' exact component={ AdEdit } />
                  <PrivateRoute path='/advert/edit/:id' exact component={ AdEdit } />
                  <Route path='/recoverpasswd' exact component={ RecoverPasswd } />
                  <Route path='/resetpasswd/:key' exact component={ ResetPasswd } />
                  <Route path='/advert/:param-:id' exact component={ AdDetail } />
                  <Route path='/advert/' exact component={ Search } />
                  <Route path='/home' exact component={ Home } />
                  <Route path='/' exact component={ Home } />
                  <Route path='*' component={ NotFoundPage } />
                </Switch>
          </ErrorBoundary>
        </ConfirmProvider>
      </Suspense>
  </div>
}

export default App;