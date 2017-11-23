import React from 'react'
import { LoginFieldContainer } from '../../containers/login/loginField.container.jsx'

import { Button, Col, Panel } from 'react-bootstrap';

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
			<Col xs={10} sm={10}  md={6} lg={6} xsOffset={1} smOffset={1} mdOffset={3} lgOffset={3} >
				<Panel bsStyle='primary'>
					<span>{props.syntaxErrorText}</span>
					<LoginFieldContainer id='loginUsername' type='loginUsername' label='Username: '
						placeholder='Username' textChange={(key,value) => Login.textChange(key,value)}/>
					<LoginFieldContainer id='loginPassword' type='loginPassword' label='Password: '
						placeholder='Password' textChange={(key,value) => Login.textChange(key,value)}/>
					<Button block className='btn-primary' onClick={()=> props.login(fields['loginUsername'], fields['loginPassword'])} >LOGIN</Button>
				</Panel>
			</Col>
		)}
}

export default Login
