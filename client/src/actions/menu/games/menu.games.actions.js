import * as _ from '../../../constants/menu/games/menu.games.actions.constants';
import to from 'await-to-js';

export const createGameAction = (uid, name) => {
	return async (dispatch)=>{
		dispatch({type:_.CREATE_GAME_PENDING});
		var [err, res] = await to(fetch('/games/create', {
			method: 'post',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: `creatorId=${uid}${name && name.length > 0 ? `&name=${name}` : ''}`}));
		if(err){
			dispatch({type:_.CREATE_GAME_ERROR});
			throw new Error(err);
		}else{
    	dispatch({type:_.CREATE_GAME_SUCCESS});
    	dispatch(loadGamesAction(uid));
			return res;
		}

	};
};



export const loadGamesAction = (uid) => {
	return async (dispatch)=>{
		dispatch({type:_.LOAD_GAMES_PENDING});
		let [err,res] = await to(fetch(`/games?userId=${uid}`, {
			method: 'get',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}))
		if(err){
			dispatch({type:_.LOAD_GAMES_ERROR});
		}else{
			let data = await res.json();
			dispatch({type:_.LOAD_GAMES_SUCCESS, data: data});
		}
	};
};
