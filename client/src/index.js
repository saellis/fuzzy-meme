import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'react-tabs/style/react-tabs.css';
import './libs/fa/css/font-awesome.min.css';

import UserPortalContainer from './containers/login/userPortal.container.jsx';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';


import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import baseReducer from './reducers/base.reducer';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  baseReducer,
	applyMiddleware(thunk, middleware, logger));

ReactDOM.render(
  <Provider store={store}>
		<ConnectedRouter history={history}>
		 <div className='text-center'>
			 <Route exact path="/" component={UserPortalContainer}/>
		 </div>
	 </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
