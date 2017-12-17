import React from 'react'
import { LoginFieldContainer } from '../../containers/login/loginField.container.jsx';


import {Button, Panel, Col, Alert } from 'react-bootstrap';

import {fieldConfig} from '../../constants/login/createUser.config.js';

import {regex} from '../../constants/users.constants.js';


export class CreateUser extends React.Component{
	constructor(props){
			super(props);
			this.state = {fields:{}};
	}

	async validateForm(un, pw, pw2, successCallback, errorCallback, submit) {
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
					try{
						await successCallback(un, pw);
					}catch(e){
						return;
					}
					this.resetForm();
				}else{
					errorCallback([]);
				}
			}
		}
	}

	handleChange(key, value) {
		this.setState((prevState) => {
					let fields = this.state.fields;
					fields[key] = value;
					return {fields: fields};
			}, () => this.doValidation(false));
	}

	doValidation(submit){
		//console.log(this.state.fields);
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

	creationErrorAlert(){
		return this.props.creationErrorText && this.props.creationErrorText.length > 0 ?
			(<Alert bsStyle='danger'>
				{this.props.creationErrorText}
			</Alert>) :
				null;
	}

	creationSuccessAlert(){
		return this.props.creationSuccessText && this.props.creationSuccessText.length > 0 ?
			(<Alert bsStyle='success'>
				{this.props.creationSuccessText}
			</Alert>) :
				null;
	}

	resetForm(){
		//this.state.form.reset();
		//this.state.un.reset();
		this.setState({fields: {}})
		let refs = ['un', 'pw1', 'pw2']
		refs.forEach((refName)=>{
			this.refs[refName].wrappedInstance.reset();
		});
	}

	render() {
		return(
			<div>
				<Col xs={10} sm={10}  md={6} lg={6} xsOffset={1} smOffset={1} mdOffset={3} lgOffset={3} >
					<Panel bsStyle="primary">
						{this.creationErrorAlert()}
						{this.creationSuccessAlert()}
						{fieldConfig.map((props) => {
							return (<LoginFieldContainer {...props} textChange={(key,value) => this.handleChange(key, value)}/>);
						})}
						<Button block className='btn-primary' disabled={this.props.pending || this.props.errors.length > 0 || Object.keys(this.state.fields).length === 0}
							onClick={()=> {this.doValidation(true);}}>Create {this.props.pending ? (<i className="fa fa-spinner fa-pulse fa-fw" aria-hidden="true"></i>) : null}</Button>
					</Panel>
				</Col>

				<Col xs={10} sm={10}  md={3} lg={3} xsOffset={1} smOffset={1} mdOffset={0} lgOffset={0} >
					{this.errorPanel()}
				</Col>
			</div>
		)
	}

}
