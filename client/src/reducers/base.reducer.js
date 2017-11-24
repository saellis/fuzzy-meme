import { combineReducers } from 'redux';

import users from './login/users.base.reducer';
import games from './games.reducer';

export default combineReducers({
	games: games,
	users: users

});
