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
			);
	}
}