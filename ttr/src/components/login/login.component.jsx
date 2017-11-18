import React from 'react'
import LoginFieldContainer from '../../containers/login/loginField.container'

const Login =  (props) => (
		<div>
			<LoginFieldContainer type='loginUsername' placeholder='Username'/>
			<LoginFieldContainer type='loginPassword' placeholder='Password'/>
			<button onClick={()=> props.login(props.un, props.pwd)} >ASDASD</button>
		</div>
	)


export default Login;