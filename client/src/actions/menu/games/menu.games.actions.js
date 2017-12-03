import * as _ from '../../../constants/menu/games/menu.games.actions.constants';
import to from 'await-to-js';

export const createGameAction = (uid) => {
	return async (dispatch)=>{
		dispatch({type:_.CREATE_GAME_PENDING});
		var [err, res] = await to(fetch('/games/create', {
			method: 'post',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: `creatorId=${uid}`}));
		if(err){
			console.log(err);
			dispatch({type:_.CREATE_GAME_ERROR});
			throw new Error(err);
		}else{
			console.log(res);
    	dispatch({type:_.CREATE_GAME_SUCCESS});
    	dispatch(loadGamesAction(uid));
			return res;
		}
		// }).json();
		// return fetch('/games/create', {
		// 	method: 'post',
		// 	headers: {
		// 		'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		// 	},
		// 	body: `creatorId=${uid}`
		// }).then(res => res.json()).then(
		// 		data => {
    //       console.log(data);
    //     	dispatch({type:_.CREATE_GAME_SUCCESS});
    //     	dispatch(loadGamesAction(uid));
    //
		// 		},
		// 		error => {
    //       console.log(error);
    //
		// 		}//maybe dispatch an action that does some sort of notification on screen?
		// 	);
	};
};



export const loadGamesAction = (uid) => {
	return (dispatch)=>{
		dispatch({type:_.LOAD_GAMES_PENDING});
		return fetch(`/games?userId=${uid}`, {
			method: 'get',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(res => res.json()).then(
				data => {
        	dispatch({type:_.LOAD_GAMES_SUCCESS, data: data});
				},
				error => {
        	dispatch({type:_.LOAD_GAMES_ERROR});
				}//maybe dispatch an action that does some sort of notification on screen?
			);
	};
};
