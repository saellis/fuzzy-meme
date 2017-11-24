import * as _ from '../../actions/users.actions';

const users = (state = {syntaxErrors: []}, action) => {
	switch (action.type) {

    //Section for creating user
	case _.CREATE_USER_PENDING:
		return {...state, userPending: true};
	case _.CREATE_USER_SUCCESS:
		return {...state, userId: action.data._id, userGames: action.data.games, pending: false};
	case _.CREATE_USER_ERROR:
		return {...state, errorText: 'Error creating user.', pending: false};

	case _.UPDATE_CREATE_USER_SYNTAX_ERROR:
		return {...state, syntaxErrors: action.errors};
	case _.CLEAR_CREATE_USER_SYNTAX_ERROR:
		return {...state, syntaxErrors: []};
	case _.CLEAR_CREATE_USER:
		return {...state, syntaxErrors: [], createUserErrorMsg: '', pending: false};


	default:
		return state;
	}
};

export default users;
