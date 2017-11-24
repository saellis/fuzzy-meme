import React from 'react'
import { LoginFieldContainer } from '../../containers/login/loginField.container.jsx'

import { Button, Col, Panel, Alert } from 'react-bootstrap';


export class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {fields: {}}
	}

	textChange(key, value){
		this.setState((prevState) => {
			let newState = prevState;
			newState.fields[key] = value;
			return newState;
		})
	}

	creationErrorAlert(){
		return this.props.errorText && this.props.errorText.length > 0 ?
			(<Alert bsStyle='danger'>
				{this.props.errorText}
			</Alert>) :
				'';
	}


	render(){

		return(
			<Col xs={10} sm={10}  md={6} lg={6} xsOffset={1} smOffset={1} mdOffset={3} lgOffset={3} >
				<Panel bsStyle='primary'>
					{this.creationErrorAlert()}
					<LoginFieldContainer id='loginUsername' type='loginUsername' label='Username: '
						placeholder='Username' textChange={(key,value) => this.textChange(key,value)}/>
					<LoginFieldContainer id='loginPassword' type='loginPassword' label='Password: '
						placeholder='Password' textChange={(key,value) => this.textChange(key,value)}/>
					<Button block className='btn-primary' onClick={()=> this.props.login(this.state.fields['loginUsername'], this.state.fields['loginPassword'])} >LOGIN</Button>
				</Panel>
			</Col>
		)}
}

export default Login
