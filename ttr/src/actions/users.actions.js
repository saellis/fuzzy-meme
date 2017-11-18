export const CREATE_USER_PENDING = 'CREATE_USER_PENDING';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';



export const createUserAction = () => {
	return (dispatch)=>{
		dispatch({type:CREATE_USER_PENDING});
		return fetch('http://localhost:3001/users/create', { 
		        method: 'POST',
		        data: {
		          username: 'jared',
		          password: 'swinney'
		        }
		      }).then(res => res.json()).then(
				data => dispatch({type:CREATE_USER_SUCCESS, data: data}),
				error => dispatch({type:CREATE_USER_ERROR})
				//maybe dispatch an action that does some sort of notification on screen?
			);
	}
}


export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_INCORRECT = 'LOGIN_INCORRECT';
export const LOGIN_ERROR = 'LOGIN_ERROR';



export const loginAction = (un, pw) => {
	return (dispatch)=>{
		dispatch({type:LOGIN_PENDING, data: {un:un, pw:pw}});
		return fetch('http://localhost:3001/users/login', { 
		        method: 'POST',
		        data: {
		          username: un,
		          password: pw
		        }
		      }).then(res => res.json()).then(
				data => {
					//TODO: Check to see if successful login
					if(true){
						dispatch({type:LOGIN_SUCCESS, data: data})
					}else{
						dispatch({type:LOGIN_INCORRECT, data: data})
					}
				},
				error => dispatch({type:LOGIN_ERROR})
				//maybe dispatch an action that does some sort of notification on screen?
			);
	}
}

export const UPDATE_FIELD = 'UPDATE_FIELD';

export const updateFieldAction = (key, text) => {
	return (dispatch)=>{
		dispatch({
			type:UPDATE_FIELD,
			text: text,
			key: key
		})
	}
}

