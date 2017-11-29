import { combineReducers } from 'redux';

import users from './login/users.base.reducer';
import games from './games.reducer';

import {router} from './routes/routes.reducer.js'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const config = {
  key: 'router',
  storage,
}

const pPouterReducer = persistReducer(config, router);

export default combineReducers({
	games: games,
	users: users,
	routes: pPouterReducer

});
