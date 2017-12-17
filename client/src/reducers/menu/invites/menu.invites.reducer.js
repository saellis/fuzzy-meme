import * as _ from '../../../constants/menu/invites/menu.invites.actions.constants.js';
import * as router from '../../../constants/routes.constants.js'

const initialState = {
  usersList: []
}

const invites = (state = initialState, action) => {
	switch (action.type) {

    //Section for creating games
	case _.LOAD_INVITE_USERS_LIST_PENDING:
		return {...state, loadUsersPending: true};
	case _.LOAD_INVITE_USERS_LIST_SUCCESS:
		return {...state, loadUsersPending: false, usersList: action.data};
	case _.LOAD_INVITE_USERS_LIST_ERROR:
		return {...state, errorText:'Something happened.', loadUsersPending: false};


  case router.HOME:
    return initialState;


	default:
		return state;
	}
};


export default invites;
