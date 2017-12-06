import * as _ from '../../constants/login/createUser.actions.constants';

import to from 'await-to-js';

export const createUserAction = (un, pw) => {
	return async (dispatch)=>{
		dispatch({type:_.CREATE_USER_PENDING});
		dispatch({type:_.CLEAR_CREATE_USER_ERROR});
		dispatch({type:_.CLEAR_CREATE_USER_SUCCESS});
		try{
			let res = await fetch('/users/create', {
				method: 'post',
				headers: {
					'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				body: `username=${un}&password=${pw}`
			});

			let data = await res.json();
			if(data.err){
				dispatch({type:_.CREATE_USER_ERROR, error: data.err});
				throw new Error(data.err);
			}else{
				dispatch({type:_.CREATE_USER_SUCCESS, data: data});
				dispatch({type:_.CLEAR_CREATE_USER_SYNTAX_ERROR});
				return data;
			}
		}catch(err){
				console.log('sdf')
				dispatch({type:_.CREATE_USER_ERROR})
				throw new Error(err);
		}
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
