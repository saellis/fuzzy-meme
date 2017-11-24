export const CREATE_USER_PENDING = 'CREATE_USER_PENDING';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';



export const createUserAction = (un, pw) => {
	return (dispatch)=>{
		dispatch({type:CREATE_USER_PENDING});
		return fetch('http://localhost:3001/users/create', {
			method: 'post',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: `username=${un}&password=${pw}`
		}).then(res => res.json()).then(
				data => {
					dispatch({type:CREATE_USER_SUCCESS, data: data});
					dispatch({type:CLEAR_CREATE_USER_SYNTAX_ERROR});

				},
				error => dispatch({type:CREATE_USER_ERROR})
				//maybe dispatch an action that does some sort of notification on screen?
			);
	};
};



export const UPDATE_CREATE_USER_SYNTAX_ERROR = 'UPDATE_CREATE_USER_SYNTAX_ERROR';
export const CLEAR_CREATE_USER_SYNTAX_ERROR = 'CLEAR_CREATE_USER_SYNTAX_ERROR';
export const CLEAR_CREATE_USER = 'CLEAR_CREATE_USER';

export const setCreateUserSyntaxError = (errors) => {
	return (dispatch) => {
		dispatch({type:UPDATE_CREATE_USER_SYNTAX_ERROR, errors:errors});
	};
};

export const clearCreateUserSyntaxError = () => {
	return (dispatch) => {
		dispatch({type:CLEAR_CREATE_USER_SYNTAX_ERROR});
	};
};

export const clearCreateUser = () => {
	return dispatch => dispatch({type:CLEAR_CREATE_USER})
}

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_INCORRECT = 'LOGIN_INCORRECT';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CLEAR_LOGIN_ERROR_TEXT = 'CLEAR_LOGIN_ERROR_TEXT';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';


export const loginAction = (un, pw) => {
	return (dispatch)=>{
		dispatch({type:LOGIN_PENDING});
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
						dispatch({type:LOGIN_SUCCESS, data: data});
						dispatch({type:CLEAR_LOGIN_ERROR_TEXT});
					}else{
						dispatch({type:LOGIN_INCORRECT, data: data});
					}
				},
				error => dispatch({type:LOGIN_ERROR})
				//maybe dispatch an action that does some sort of notification on screen?
			);
	};
};

export const clearLogin = () => {
	return dispatch => dispatch({type:CLEAR_LOGIN});
}
