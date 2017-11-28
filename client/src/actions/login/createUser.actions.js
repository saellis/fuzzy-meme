import * as _ from '../../constants/login/createUser.actions.constants';

export const createUserAction = (un, pw) => {
	return (dispatch)=>{
		dispatch({type:_.CREATE_USER_PENDING});
		dispatch({type:_.CLEAR_CREATE_USER_ERROR});
		dispatch({type:_.CLEAR_CREATE_USER_SUCCESS});
		return fetch('/users/create', {
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
						dispatch({type:_.RESET_CREATE_FORM});
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

export const resetCreateForm = () => {
	return (dispatch) => {
		dispatch({type:_.RESET_CREATE_FORM})
	}
}

export const resetCreateFormComplete = () => {
	return (dispatch) => {
		dispatch({type:_.RESET_CREATE_FORM_COMPLETE})
	}
}
