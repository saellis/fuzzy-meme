import CreateUser from '../createUser.component.jsx';
import LoginFieldContainer from '../../../containers/login/loginField.container.jsx';

import React from 'react';
import { Button } from 'react-dom'
import { mount, shallow } from 'enzyme';
import { createUserAction }  from '../../../actions/users.actions';


describe('<CreateUser>', () => {
	var wrapper;
	beforeEach(() => {
		wrapper = shallow(<CreateUser.CreateUser createUser={()=>{}}
							setErrorText={() => {}} />);
	})
	it('should have three inputs', () => {
		expect(wrapper.find(LoginFieldContainer)).to.have.length(3);
	});

	it('first input should be for username', () => {
		const field = wrapper.find(LoginFieldContainer).at(0);
		expect(field.props().id).to.match(/username$/i);
		expect(field.props().type).to.match(/username$/i);
		expect(field.props().placeholder).to.match(/username$/i);
		expect(field.props().textChange).to.be.a('function');
	});

	it('second and third input should be for password', () => {
		for(var i = 1; i < 2; i++){
			const field = wrapper.find(LoginFieldContainer).at(1);
			expect(field.props().id).to.match(/password$/i);
			expect(field.props().type).to.match(/password$/i);
			expect(field.props().placeholder).to.match(/password$/i);
			expect(field.props().textChange).to.be.a('function');
		}
	});

	it('should have a button', () => {
		const field = wrapper.find('button');
		expect(field).to.have.length(1);
		field.at(0).simulate('click');
	});


	it('should save on keypress', () => {
		wrapper.find(LoginFieldContainer).forEach((field) => {
			field.props().textChange(field.props().id, 'test');
			expect(CreateUser.getFields()[field.props().id]).to.equal('test');
		})
	});

	describe('form validation', () => {
		var success;
		beforeEach(() => {
			CreateUser.textChange('createUsername', 'abcabcabc');
			CreateUser.textChange('createPassword', 'Aa111111');
			CreateUser.textChange('createConfirmPassword', 'Aa111111');
			success = undefined;
		})
		it('correct data', () => {
			CreateUser.validateForm(CreateUser.getFields()['createUsername'],
				CreateUser.getFields()['createPassword'],
				CreateUser.getFields()['createConfirmPassword'],
				(un, pw) => success = true,
				(err) => success = false);
			expect(success).to.equal(true);
		});
		it('invalid username', () => {
			CreateUser.textChange('createUsername', 'aa');
			CreateUser.validateForm(CreateUser.getFields()['createUsername'],
				CreateUser.getFields()['createPassword'],
				CreateUser.getFields()['createConfirmPassword'],
				(un, pw) => success = true,
				(err) => success = false);
			expect(success).to.equal(false);
		});		
		it('non-matching passwords', () => {
			CreateUser.textChange('createPassword', 'AA111111');
			CreateUser.textChange('createConfirmPassword', 'AA112111');
			CreateUser.validateForm(CreateUser.getFields()['createUsername'],
				CreateUser.getFields()['createPassword'],
				CreateUser.getFields()['createConfirmPassword'],
				(un, pw) => success = true,
				(err) => success = false);
			expect(success).to.equal(false);
		});		
		it('no lower case', () => {
			CreateUser.textChange('createPassword', 'AA111111');
			CreateUser.textChange('createConfirmPassword', 'AA111111');
			CreateUser.validateForm(CreateUser.getFields()['createUsername'],
				CreateUser.getFields()['createPassword'],
				CreateUser.getFields()['createConfirmPassword'],
				(un, pw) => success = true,
				(err) => success = false);
			expect(success).to.equal(false);
		});		
		it('password too short', () => {
			CreateUser.textChange('createPassword', 'AA1111');
			CreateUser.textChange('createConfirmPassword', 'AA1111');
			CreateUser.validateForm(CreateUser.getFields()['createUsername'],
				CreateUser.getFields()['createPassword'],
				CreateUser.getFields()['createConfirmPassword'],
				(un, pw) => success = true,
				(err) => success = false);
			expect(success).to.equal(false);
		});
		it('no uppercase', () => {
			CreateUser.textChange('createPassword', 'aa111111');
			CreateUser.textChange('createConfirmPassword', 'aa111111');
			CreateUser.validateForm(CreateUser.getFields()['createUsername'],
				CreateUser.getFields()['createPassword'],
				CreateUser.getFields()['createConfirmPassword'],
				(un, pw) => success = true,
				(err) => success = false);
			expect(success).to.equal(false);
		});
		it('no digit', () => {
			CreateUser.textChange('createPassword', 'aAaAaAaA');
			CreateUser.textChange('createConfirmPassword', 'aAaAaAaA');
			CreateUser.validateForm(CreateUser.getFields()['createUsername'],
				CreateUser.getFields()['createPassword'],
				CreateUser.getFields()['createConfirmPassword'],
				(un, pw) => success = true,
				(err) => success = false);
			expect(success).to.equal(false);
		});

	})

});