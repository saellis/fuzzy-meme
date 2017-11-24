import * as _ from '../constants/users.actions.constants';

export const createUserAction = (un, pw) => {
	return (dispatch)=>{
		dispatch({type:_.CREATE_USER_PENDING});
		return fetch('http://localhost:3001/users/create', {
			method: 'post',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: `username=${un}&password=${pw}`
		}).then(res => res.json()).then(
				data => {
					if(data.err){
						dispatch({type:_.CREATE_USER_ERROR, error: data.err});
					}else{
						dispatch({type:_.CREATE_USER_SUCCESS, data: data});
						dispatch({type:_.CLEAR_CREATE_USER_SYNTAX_ERROR});
					}

				},
				error => dispatch({type:_.CREATE_USER_ERROR})
				//maybe dispatch an action that does some sort of notification on screen?
			);
	};
};

export const setCreateUserSyntaxError = (errors) => {
	return (dispatch) => {
		dispatch({type:_.UPDATE_CREATE_USER_SYNTAX_ERROR, errors:errors});
	};
};

export const clearCreateUserSyntaxError = () => {
	return (dispatch) => {
		dispatch({type:_.CLEAR_CREATE_USER_SYNTAX_ERROR});
	};
};

export const clearCreateUser = () => {
	return dispatch => dispatch({type:_.CLEAR_CREATE_USER})
}

export const loginAction = (un, pw) => {
	return (dispatch)=>{
		dispatch({type:_.LOGIN_PENDING});
		return fetch('http://localhost:3001/users/auth', {
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
