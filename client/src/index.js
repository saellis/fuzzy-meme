import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'react-tabs/style/react-tabs.css';
import Root from './root.component';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import baseReducer from './reducers/base.reducer';


let store = createStore(
	baseReducer,
	applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
