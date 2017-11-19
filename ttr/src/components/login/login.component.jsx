import React from 'react'
import LoginFieldContainer from '../../containers/login/loginField.container.jsx'

const Login =  (props) => {
	var fields = {};

	const textChange = (key, value) =>{
		fields[key] = value;
	}

	return(
		<div>
			<LoginFieldContainer id='loginUsername' type='loginUsername' placeholder='Username' textChange={(key,value) => textChange(key,value)}/>
			<LoginFieldContainer id='loginPassword' type='loginPassword' placeholder='Password' textChange={(key,value) => textChange(key,value)}/>
			<button onClick={()=> props.login(fields['loginUsername'], fields['loginPassword'])} >LOGIN</button>
		</div>
	)}


export default Login;

