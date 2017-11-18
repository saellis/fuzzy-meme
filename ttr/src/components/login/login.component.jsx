import React from 'react'
import LoginFieldContainer from '../../containers/login/loginField.container'

const Login =  (props) => {
	var fields = {};

	const textChange = (key, value) =>{
		fields[key] = value;
	}

	return(
		<div>
			<LoginFieldContainer type='loginUsername' placeholder='Username' textChange={(key,value) => textChange(key,value)}/>
			<LoginFieldContainer type='loginPassword' placeholder='Password' textChange={(key,value) => textChange(key,value)}/>
			<button onClick={()=> props.login(fields['loginUsername'], fields['loginPassword'])} >LOGIN</button>
		</div>
	)}


export default Login;