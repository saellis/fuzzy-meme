import React from 'react'
import LoginFieldContainer from '../../containers/login/loginField.container.jsx'

const fields = {};

const Login = {
	getFields: () =>{
		return fields;
	},

	textChange: (key, value) =>{
		fields[key] = value;
	},

	Login: (props) => {

		return(
			<div>
				<span>{props.syntaxErrorText}</span>
				<LoginFieldContainer id='loginUsername' type='loginUsername' placeholder='Username' textChange={(key,value) => Login.textChange(key,value)}/>
				<LoginFieldContainer id='loginPassword' type='loginPassword' placeholder='Password' textChange={(key,value) => Login.textChange(key,value)}/>
				<button onClick={()=> props.login(fields['loginUsername'], fields['loginPassword'])} >LOGIN</button>
			</div>
		)}
}

export default Login




