import React from 'react'
import LoginFieldContainer from '../../containers/login/loginField.container.jsx'

import {Button} from 'react-bootstrap';

const fields = {};

const CreateUser =  {

	getFields: () =>{
		return fields;
	},

	textChange: (key, value) => {
		fields[key] = value;
	},

	validateForm: (un, pw, pw2, successCallback, errorCallback) => {
		if(!un || !pw || !pw2){
			errorCallback('please fill in all boxes');
			return;
		}
		if(!un.match(/[a-zA-Z0-9@.]{6,}/)){
			errorCallback("username too short");
		}else if(pw !== pw2){
			errorCallback("pword no match")
		}else{
			if(!pw.match(/.{8,}/)){
				errorCallback("too short")
			}else if(!pw.match(/.*[A-Z].*/)){
				errorCallback("uppercase pls")
			}else if(!pw.match(/.*[a-z].*/)){
				errorCallback("lowercase pls")
			}else if(!pw.match(/.*[0-9].*/)){
				errorCallback("need digit")
			}else{
				//success
				successCallback(un, pw);
			}
		}
	},

	CreateUser: (props) =>  {return(
		<div >
			<span>{props.errorText}</span>
			<LoginFieldContainer id='createUsername' type='createUsername' label='Username: '
				placeholder='Username' textChange={(key,value) => CreateUser.textChange(key,value)}/>
			<LoginFieldContainer id='createPassword' type='createPassword' label='Password: '
				placeholder='Password' textChange={(key,value) => CreateUser.textChange(key,value)}/>
			<LoginFieldContainer id='createConfirmPassword' type='createConfirmPassword' label='Confirm password: '
				placeholder='Confirm Password' textChange={(key,value) => CreateUser.textChange(key,value)}/>
			<Button block className='btn-primary' onClick={()=> CreateUser.validateForm(fields['createUsername'], fields['createPassword'],
				fields['createConfirmPassword'], props.createUser, props.setErrorText)}>CREATE</Button>
		</div>
	)}

}
export default CreateUser;
