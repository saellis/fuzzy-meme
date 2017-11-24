import * as _ from '../../constants/users.actions.constants.js';

const initialState = {
	syntaxErrors: []
}

const users = (state = initialState, action) => {
	switch (action.type) {

    //Section for creating user
	case _.CREATE_USER_PENDING:
		return {...state, userPending: true};
	case _.CREATE_USER_SUCCESS:
		return {...state, creationSuccessText: `Successfully created user: ${action.data.username}`};
	case _.CREATE_USER_ERROR:
		return {...state, errorText: `Error creating user (${action.error})`, pending: false};

	case _.UPDATE_CREATE_USER_SYNTAX_ERROR:
		return {...state, syntaxErrors: action.errors};
	case _.CLEAR_CREATE_USER_SYNTAX_ERROR:
		return {...state, syntaxErrors: []};
	case _.CLEAR_CREATE_USER:
		return initialState;//{...state, syntaxErrors: [], createUserErrorMsg: '', errorText: '', pending: false};
	case _.RESET_CREATE_FORM:
		return {...state, shouldResetForm: true};
	case _.RESET_CREATE_FORM_COMPLETE:
		return {...state, shouldResetForm: false};

	default:
		return state;
	}
};

export default users;
