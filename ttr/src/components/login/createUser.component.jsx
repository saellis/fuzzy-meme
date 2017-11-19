import React from 'react'
import LoginFieldContainer from '../../containers/login/loginField.container.jsx'


const fields = {};

const CreateUser =  (props) => {

	const textChange = (key, value) => {
		fields[key] = value;
	}

	const validateForm = (un, pw, pw2) => {
		console.log(fields, un , pw, pw2);
		if(!un || !pw || !pw2){
			props.setErrorText('please fill in all boxes');
			return;
		}
		if(!un.match(/[a-zA-Z0-9@\.]{6,}/)){
			props.setErrorText("username too short");
		}else if(pw !== pw2){
			props.setErrorText("pword no match")
		}else{
			if(!pw.match(/.{8,}/)){
				props.setErrorText("too short")
			}else if(!pw.match(/.*[A-Z].*/)){
				props.setErrorText("uppercase pls")
			}else if(!pw.match(/.*[a-z].*/)){
				props.setErrorText("lowercase pls")
			}else if(!pw.match(/.*[0-9].*/)){
				props.setErrorText("need digit")
			}else{
				//success
				props.createUser(un, pw);
			}
		}
	}

	return(
		<div>
			<span>{props.errorText}</span>
			<LoginFieldContainer id='createUsername' type='createUsername' placeholder='Username' textChange={(key,value) => textChange(key,value)}/>
			<LoginFieldContainer id='createPassword' type='createPassword' placeholder='Password' textChange={(key,value) => textChange(key,value)}/>
			<LoginFieldContainer id='createConfirmPassword' type='createConfirmPassword' placeholder='Confirm Password' textChange={(key,value) => textChange(key,value)}/>
			<button onClick={()=> validateForm(fields['createUsername'], fields['createPassword'], fields['createConfirmPassword'])} >CREATE</button>
		</div>
	)}


export default CreateUser;

