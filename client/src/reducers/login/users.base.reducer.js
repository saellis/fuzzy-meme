import { combineReducers } from 'redux';

import loginForm from './loginForm.reducer';
import loginUser from './loginUser.reducer';
import createUser from './createUser.reducer';

export default combineReducers({
	login : combineReducers({
		form: loginForm,
		user: loginUser
	}),
	create : createUser
});
