import * as _ from '../actions/users.actions';

const users = (state = {}, action) => {
  switch (action.type) {
  	case _.CREATE_USER_PENDING:
  		return {...state, pending: true};
  	case _.CREATE_USER_SUCCESS:
  		return {...state, userId: action.data._id, 
  				userGames: action.data.games, pending: false};
  	case _.CREATE_USER_ERROR:
  		return {...state, errorMsg: action.data.error, pending: false};
    default:
      	return state;
  }
}

export default users;