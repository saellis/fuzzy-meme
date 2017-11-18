import React from 'react'



const LoginField =  (props) => {
	return (
		<input type={props.type.toLowerCase().indexOf('password') !== -1 ? 'password' : 'text'} 
					placeholder={props.placeholder}
					onChange={(evt) => props.textChange(props.type, evt.target.value)} />
	)}


export default LoginField;