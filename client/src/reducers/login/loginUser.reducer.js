import * as _ from '../../constants/login/login.actions.constants.js';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native

const initialState = {
}

const loginUser = (state = initialState, action) => {
	switch (action.type) {
	case _.LOGIN_SUCCESS:
		return action.data;
	case _.CLEAR_LOGIN:
		return initialState;//{...state, errorText:'', pending: false};

	default:
		return state;
	}
};

const config = {
  key: 'user',
  storage,
}

const reducer = persistReducer(config, loginUser);

export default reducer;
