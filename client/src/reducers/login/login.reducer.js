import * as _ from '../../constants/users.actions.constants.js';

const initialState = {
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
	case _.RESET_LOGIN_FORM:
		return {...state, shouldResetForm: true}

	default:
		return state;
	}
};

export default users;
