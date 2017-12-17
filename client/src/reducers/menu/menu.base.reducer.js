import { combineReducers } from 'redux';

import games from './games/menu.games.reducer';
import invites from './invites/menu.invites.reducer';

export default combineReducers({
	games,
	invites
});
