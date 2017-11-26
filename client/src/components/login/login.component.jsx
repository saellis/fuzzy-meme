import React from 'react'
import { LoginFieldContainer } from '../../containers/login/loginField.container.jsx'

import { Button, Col, Panel, Alert } from 'react-bootstrap';

import {fieldConfig} from '../../constants/login/login.config.js';


export class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {fields: {}}
	}

	handleChange(key, value){
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
					{fieldConfig.map((props) => {
						return (<LoginFieldContainer {...props} textChange={(key,value) => this.handleChange(key, value)}/>);
					})}
					<Button block className='btn-primary' disabled={this.props.pending}
						onClick={()=> this.props.login(this.state.fields['loginUsername'], this.state.fields['loginPassword'])} >
						Login {this.props.pending ? (<i className="fa fa-spinner fa-pulse fa-fw" aria-hidden="true"></i>) : null}</Button>
				</Panel>
			</Col>
		)}
}

export default Login
