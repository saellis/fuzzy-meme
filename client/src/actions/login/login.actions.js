import * as _ from '../../constants/login/login.actions.constants';

import * as router from '../../constants/routes.constants';
import to from 'await-to-js';


export const loginAction = (un, pw) => {
	return async (dispatch)=>{
		dispatch({type:_.LOGIN_PENDING});
		var [err, res] = await to(fetch('/users/auth', {
			method: 'post',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: `username=${un}&password=${pw}`
		}));
		if(err){
			dispatch({type:_.LOGIN_ERROR})
		}else{
			let data = await res.json();
			if(data._id){
				dispatch({type:_.LOGIN_SUCCESS, data: data});
				dispatch({type:_.CLEAR_LOGIN_ERROR_TEXT});
				dispatch({type:router.MENU});
			}else{
				dispatch({type:_.LOGIN_INCORRECT, data: data});
			}
		}
	};
};



export const clearLogin = () => {
	return dispatch => dispatch({type:_.CLEAR_LOGIN});
}
