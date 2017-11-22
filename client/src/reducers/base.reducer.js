import { combineReducers } from 'redux'

import users from './users.reducer';
import games from './games.reducer';

export default combineReducers({
  games: games,
  users: users

})