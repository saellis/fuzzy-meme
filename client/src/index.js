import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'react-tabs/style/react-tabs.css';
import './libs/fa/css/font-awesome.min.css';

import RoutesContainer from './routes/routes.container.js'

import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';


import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import baseReducer from './reducers/base.reducer';

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

let store = createStore(baseReducer, applyMiddleware(thunk, middleware, logger));
let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
  		<RoutesContainer/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
