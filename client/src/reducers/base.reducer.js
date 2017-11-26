import { combineReducers } from 'redux';

import users from './login/users.base.reducer';
import games from './games.reducer';
import {routerReducer} from 'react-router-redux'


export default combineReducers({
	games: games,
	users: users,
	router: routerReducer

});
