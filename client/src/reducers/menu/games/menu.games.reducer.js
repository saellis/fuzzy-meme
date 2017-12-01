import * as _ from '../../../constants/menu/games/menu.games.actions.constants.js';
import * as router from '../../../constants/routes.constants.js'

const initialState = {
  gameList: []
}

const games = (state = initialState, action) => {
	switch (action.type) {

    //Section for creating games
	case _.CREATE_GAME_PENDING:
		return {...state, createPending: true};
	case _.CREATE_GAME_SUCCESS:
		return {...state, createPending: false};
	case _.CREATE_GAME_ERROR:
		return {...state, createErrorText:'Something happened.', createPending: false};

    //Section for creating games
	case _.LOAD_GAMES_PENDING:
		return {...state, pending: true};
	case _.LOAD_GAMES_SUCCESS:
		return {...state, pending: false, gameList: action.data};
	case _.LOAD_GAMES_ERROR:
		return {...state, errorText:'Something happened.', pending: false};


  case router.HOME:
    return initialState;


	default:
		return state;
	}
};


export default games;
