import * as _ from '../../../constants/menu/invites/menu.invites.actions.constants';
import to from 'await-to-js';


export const loadUsersAction = (uid) => {
	return async (dispatch)=>{
		dispatch({type:_.LOAD_INVITE_USERS_LIST_PENDING});
		let [err,res] = await to(fetch(`/users/list`, {
			method: 'get',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}))
		if(err){
			dispatch({type:_.LOAD_INVITE_USERS_LIST_ERROR});
		}else{
			let data = await res.json();
			dispatch({type:_.LOAD_INVITE_USERS_LIST_SUCCESS, data: data});
		}
	};
};

export const createInvites = (invite_ids, inviter_id, game_id) => {
	return async (dispatch)=>{
		dispatch({type:_.CREATE_INVITES_PENDING});
		let [err,res] = await to(fetch(`/invite`, {
			method: 'post',
			headers: {
				'Content-type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				inviteIds:invite_ids,
				inviterId:inviter_id,
				gameId:game_id
			})
		}));
		if(err){
			dispatch({type:_.CREATE_INVITES_ERROR});
		}else{
			let data = await res.json();
			dispatch({type:_.CREATE_INVITES_SUCCESS, data: data});
		}
	};
};
