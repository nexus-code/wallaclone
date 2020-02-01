import React from 'react';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Router } from 'react-router-dom';

import App from '../App';

export default function Root({ store, history, ...props }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App {...props} />
      </Router>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};