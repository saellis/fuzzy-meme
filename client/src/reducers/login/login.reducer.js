import * as _ from '../../constants/login/login.actions.constants.js';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native

const initialState = {
	loggedInUser: {}
}

const users = (state = initialState, action) => {
	switch (action.type) {

    //Section for logging in
	case _.LOGIN_PENDING:
		return {...state, pending: true};
	case _.LOGIN_SUCCESS:
		return {...state, loggedInUser:action.data, pending: false};
	case _.LOGIN_ERROR:
		return {...state, errorText:'Something happened.', pending: false};
	case _.LOGIN_INCORRECT:
		return {...state, errorText:action.data.err, pending: false};
	case _.CLEAR_LOGIN_ERROR_TEXT:
		return {...state, errorText:''};
	case _.CLEAR_LOGIN:
		return initialState;//{...state, errorText:'', pending: false};

	default:
		return state;
	}
};

const config = {
  key: 'login',
  storage,
}

const reducer = persistReducer(config, users);

export default reducer;
