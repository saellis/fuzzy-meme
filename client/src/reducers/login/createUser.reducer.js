import * as _ from '../../constants/login/createUser.actions.constants.js';

const initialState = {
	syntaxErrors: [],
	pending: false
}

const users = (state = initialState, action) => {
	switch (action.type) {

    //Section for creating user
	case _.CREATE_USER_PENDING:
		return {...state, pending: true};
	case _.CREATE_USER_SUCCESS:
		return {...state, pending: false, creationSuccessText: `Successfully created user: ${action.data.username}`};
	case _.CREATE_USER_ERROR:
		return {...state, errorText: `Error creating user (${action.error})`, pending: false};
	case _.CLEAR_CREATE_USER_ERROR:
		return {...state, errorText: ''};
	case _.CLEAR_CREATE_USER_SUCCESS:
		return {...state, creationSuccessText: ''};

	case _.UPDATE_CREATE_USER_SYNTAX_ERROR:
		return {...state, syntaxErrors: action.errors};
	case _.CLEAR_CREATE_USER_SYNTAX_ERROR:
		return {...state, syntaxErrors: []};
	case _.CLEAR_CREATE_USER:
		return initialState;//{...state, syntaxErrors: [], createUserErrorMsg: '', errorText: '', pending: false};

	default:
		return state;
	}
};

export default users;
