import { combineReducers } from 'redux';

import users from './login/users.base.reducer';
import games from './games.reducer';

import {routerReducer} from 'react-router-redux'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const config = {
  key: 'router',
  storage,
}

const pPouterReducer = persistReducer(config, routerReducer);

export default combineReducers({
	games: games,
	users: users,
	router: pPouterReducer

});
