import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import Root from './components/Root';
import { clearLocalStorage, getUserLS, setUserLS } from './utils/localStorage';
import { configureStore } from './store';

import * as userTypes from './store/user/types';
// import * as adsTypes  from './store/ads/types';

import './i18n';

const renderApp = props =>
    ReactDOM.render(<Root {...props} />, document.getElementById('root'));

// histórico del browser
const history = createBrowserHistory();

const localUser = getUserLS();

const user = {
    user: localUser,
    };

const store = configureStore({ history })({ user });

// subscribes to store -> sincronizes localStorage
store.subscribe(() => {

    // const { lastAction, user } = store.getState();
    const { lastAction } = store.getState();

    // User user.user & ads.ads by combineReducers.View to rename
    if (lastAction.type === userTypes.USER_SAVE_SUCCESS || lastAction.type === userTypes.USER_FETCH_SUCCESS) {
        setUserLS(lastAction.user);
    }

    if (lastAction.type === userTypes.LOGOUT) {
        clearLocalStorage();
    }

});

renderApp({ store, history });