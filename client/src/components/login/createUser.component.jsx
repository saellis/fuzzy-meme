import React from 'react'
import { LoginFieldContainer } from '../../containers/login/loginField.container.jsx';

import {regex} from '../../constants/users.constants.js';

import {Button, Panel, Col} from 'react-bootstrap';

export class CreateUser extends React.Component{
	constructor(props){
			super(props);
			this.state = {fields:{}};
	}

	validateForm(un, pw, pw2, successCallback, errorCallback, submit) {
		if(!un || !pw || !pw2){
			errorCallback(['Please fill in all fields']);
			return;
		}
		if(!un.match(regex.username.regex)){
			errorCallback([regex.username.failureText]);
		}else if(pw !== pw2){
			errorCallback(['Passwords must match'])
		}else{
			const errored = [];
			regex.password.pieces.forEach((piece) => {
				if(!pw.match(piece.regex)){
					errored.push(piece.failureText);
				}
			})
			if(errored.length > 0){
				errorCallback(errored)
			}else{
				if(submit){
					successCallback(un, pw);
				}else{
					errorCallback([]);
				}
			}
		}
	}

	handleChange(key, value) {
		this.props.setFieldData(key,value);
		this.setState((prevState) => {
					let fields = this.state.fields;
					fields[key] = value;
					return {fields: fields};
			}, () => this.doValidation(false));
	}

	doValidation(submit){
		console.log(this.state.fields);
		this.validateForm(this.state.fields['createUsername'], this.state.fields['createPassword'],
			this.state.fields['createConfirmPassword'], this.props.createUser, this.props.setErrorText, submit);
	}

	errorPanel(){
		return this.props.errors.length > 0 ?
						(<Panel header='Please fix:' bsStyle='danger'>
							<ul className='errors'>
							{this.props.errors.map((el, index) => {
								return(<li className='errors' key={index + el}>{el}</li>);
							})}
							</ul>
						</Panel>) :
						''
	}

	render() {
		return(
			<div>
				<Col xs={10} sm={10}  md={6} lg={6} xsOffset={1} smOffset={1} mdOffset={3} lgOffset={3} >
					<Panel bsStyle="primary">
						<LoginFieldContainer id='createUsername' type='createUsername' label='Username:'
							regex={regex.username.regex} placeholder='Username' textChange={(key,value) => this.handleChange(key, value)}/>
						<LoginFieldContainer id='createPassword' type='createPassword' label='Password:'
							regex={regex.password.full.regex} placeholder='Password' textChange={(key,value) => this.handleChange(key, value)}/>
						<LoginFieldContainer id='createConfirmPassword' type='createConfirmPassword' label='Confirm password:'
							regex={regex.password.full.regex} placeholder='Confirm Password' textChange={(key,value) => this.handleChange(key, value)}/>
						<Button block className='btn-primary' disabled={this.props.errors.length > 0 || Object.keys(this.state.fields).length === 0}
							onClick={()=> this.doValidation(true)}>CREATE</Button>
					</Panel>
				</Col>

				<Col xs={10} sm={10}  md={3} lg={3} xsOffset={1} smOffset={1} mdOffset={0} lgOffset={0} >
					{this.errorPanel()}
				</Col>
			</div>
		)
	}

}
