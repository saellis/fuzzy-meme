import * as _ from '../../constants/login/login.actions.constants';

import * as router from '../../constants/routes.constants';

import { replace } from 'react-router-redux';

export const loginAction = (un, pw) => {
	return (dispatch)=>{
		dispatch({type:_.LOGIN_PENDING});
		return fetch('/users/auth', {
			method: 'post',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: `username=${un}&password=${pw}`
		}).then(res => res.json()).then(
				data => {
					//TODO: better check here for success, maybe pass {success: true} from back end
					if(data._id){
						dispatch({type:_.LOGIN_SUCCESS, data: data});
						dispatch({type:_.CLEAR_LOGIN_ERROR_TEXT});
						dispatch({type:router.MENU});
					}else{
						dispatch({type:_.LOGIN_INCORRECT, data: data});
					}
				},
				error => dispatch({type:_.LOGIN_ERROR})
				//maybe dispatch an action that does some sort of notification on screen?
			);
	};
};



export const clearLogin = () => {
	return dispatch => dispatch({type:_.CLEAR_LOGIN});
}
