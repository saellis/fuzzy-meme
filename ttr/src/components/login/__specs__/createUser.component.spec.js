import CreateUser from '../createUser.component.jsx';
import LoginFieldContainer from '../../../containers/login/loginField.container.jsx';

import React from 'react';
import { Button } from 'react-dom'
import { mount, shallow } from 'enzyme';
import { createUserAction }  from '../../../actions/users.actions';


describe('<CreateUser>', () => {
	var wrapper;
	beforeEach(() => {
		wrapper = shallow(<CreateUser.CreateUser />);
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
		expect(true).to.equal(false);
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
	})

});