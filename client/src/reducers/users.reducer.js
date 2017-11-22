import * as _ from '../actions/users.actions';

const users = (state = {}, action) => {
	switch (action.type) {

    //Section for creating user
  	case _.CREATE_USER_PENDING:
  		return {...state, createUserPending: true};
  	case _.CREATE_USER_SUCCESS:
  		return {...state, createUserId: action.data._id, 
  				userGames: action.data.games, createUserPending: false};
  	case _.CREATE_USER_ERROR:
  		return {...state, createUserErrorMsg: 'Error creating user.', createUserPending: false};

    //Section for logging in
	case _.LOGIN_PENDING:
		return {...state, loginPending: true};
	case _.LOGIN_SUCCESS:
		return {...state, loggedInUser:action.data, loginPending: false};
	case _.LOGIN_ERROR:
		return {...state, loginErrorText:'Something happened.', loginPending: false};
	case _.LOGIN_INCORRECT:
		return {...state, loginErrorText:action.data.err, loginPending: false};
	case _.CLEAR_LOGIN_ERROR_TEXT:
		return {...state, loginErrorText:''};



	case _.SET_CREATE_USER_SYNTAX_ERROR:
		return {...state, createUserSyntaxError: action.text};
	case _.CLEAR_CREATE_USER_SYNTAX_ERROR:
		return {...state, createUserSyntaxError: ''};

	default:
      	return state;
	}
};

export default users;