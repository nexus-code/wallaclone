import React from 'react';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';

import Home      from '../Home';
import Search    from '../Search';
import Register  from '../Register';
import AdEdit from '../AdEdit';
import AdDetail  from '../AdDetail';
import * as config  from '../../constants';
import NotFoundPage from '../404/NotFoundPage';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App({ user, ads, props }) {
  
  toast.configure(config.toastConfigure);

  const  location = useLocation();
 
  if (!user.user && location.pathname !== config.PATH_REGISTER){
      
    return <Redirect to={config.PATH_REGISTER} />
  }

  return <div>
      <ToastContainer />
      <ErrorBoundary>
            <Switch>
              <Route path='/register' exact component={ Register } />
              <Route path="/profile" exact component={ Register } />
              <Route path='/advert/create' exact component={ AdEdit } />
              <Route path='/advert/edit/:id' exact component={ AdEdit } />
              <Route path='/advert/:id' exact component={ AdDetail } />
              <Route path='/advert/' exact component={ Search } />
              <Route path='/home' exact component={ Home } />
              <Route path='/' exact component={ Home } />
              <Route path='*' component={ NotFoundPage } />
              {/* <Route component={ Register } /> */}
            </Switch>
      </ErrorBoundary>
  </div>
}

export default App;