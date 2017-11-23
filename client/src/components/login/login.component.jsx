import React from 'react'
import LoginFieldContainer from '../../containers/login/loginField.container.jsx'

import { Button } from 'react-bootstrap';

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
				<LoginFieldContainer id='loginUsername' type='loginUsername' label='Username: '
					placeholder='Username' textChange={(key,value) => Login.textChange(key,value)}/>
				<LoginFieldContainer id='loginPassword' type='loginPassword' label='Password: '
					placeholder='Password' textChange={(key,value) => Login.textChange(key,value)}/>
				<Button block className='btn-primary' onClick={()=> props.login(fields['loginUsername'], fields['loginPassword'])} >LOGIN</Button>
			</div>
		)}
}

export default Login
