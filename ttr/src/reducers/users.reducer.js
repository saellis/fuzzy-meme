import * as _ from '../actions/users.actions';

const users = (state = {fields:{}}, action) => {
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
    case _.LOGIN_SUCCESS:
    case _.LOGIN_ERROR:
    case _.LOGIN_INCORRECT:
      return {...state, login:'yeah!'};


    //Section for user login form
    case _.UPDATE_FIELD:
      var temp = state.fields;
      temp[action.key] = action.text
      return {...state, fields: temp}

    default:
      	return state;
  }
}

export default users;