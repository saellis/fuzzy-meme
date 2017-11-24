import { combineReducers } from 'redux';

import login from './login.reducer';
import createUser from './createUser.reducer';

export default combineReducers({
	login : login,
	create : createUser
});
