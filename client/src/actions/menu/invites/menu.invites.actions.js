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
