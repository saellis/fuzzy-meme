import CreateUser from '../createUser.component.jsx';
import LoginFieldContainer from '../../../containers/login/loginField.container.jsx';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { createUserAction }  from '../../../actions/users.actions';


describe('<CreateUser>', () => {
	var wrapper;
	var props;
	beforeEach(() => {
		props = {
			createUser: sinon.spy(),
			setErrorText: sinon.spy(),
		};
		wrapper = shallow(<CreateUser.CreateUser {...props} />);
	});
	it('should have three inputs', () => {
		wrapper.find(LoginFieldContainer).should.have.length(3);
	});

	it('first input should be for username', () => {
		const field = wrapper.find(LoginFieldContainer).at(0);
		field.props().id.should.match(/username$/i);
		field.props().type.should.match(/username$/i);
		field.props().placeholder.should.match(/username$/i);
		field.props().textChange.should.be.a('function');
	});

	it('second and third input should be for password', () => {
		for(var i = 1; i < 2; i++){
			const field = wrapper.find(LoginFieldContainer).at(1);
			field.props().id.should.match(/password$/i);
			field.props().type.should.match(/password$/i);
			field.props().placeholder.should.match(/password$/i);
			field.props().textChange.should.be.a('function');
		}
	});

	it('should have a button', () => {
		const field = wrapper.find('button');
		field.should.have.length(1);
		field.at(0).simulate('click');
		props.setErrorText.should.have.been.called;
	});


	it('should save on keypress', () => {
		wrapper.find(LoginFieldContainer).forEach((field) => {
			field.props().textChange(field.props().id, 'test');
			CreateUser.getFields()[field.props().id].should.equal('test');
		});
	});

	describe('form validation', () => {
		var field;
		beforeEach(() => {
			CreateUser.textChange('createUsername', 'abcabcabc');
			CreateUser.textChange('createPassword', 'Aa111111');
			CreateUser.textChange('createConfirmPassword', 'Aa111111');
			field = wrapper.find('button');
		});

		it('correct data', () => {
			field.at(0).simulate('click');
			props.createUser.should.have.been.called;
		});

		it('invalid username', () => {
			CreateUser.textChange('createUsername', 'aa');
			field.at(0).simulate('click');
			props.setErrorText.should.have.been.called;
		});

		it('non-matching passwords', () => {
			CreateUser.textChange('createPassword', 'AA111111');
			CreateUser.textChange('createConfirmPassword', 'AA112111');
			field.at(0).simulate('click');
			props.setErrorText.should.have.been.called;
		});

		it('no lower case', () => {
			CreateUser.textChange('createPassword', 'AA111111');
			CreateUser.textChange('createConfirmPassword', 'AA111111');
			field.at(0).simulate('click');
			props.setErrorText.should.have.been.called;
		});

		it('password too short', () => {
			CreateUser.textChange('createPassword', 'AA1111');
			CreateUser.textChange('createConfirmPassword', 'AA1111');
			field.at(0).simulate('click');
			props.setErrorText.should.have.been.called;
		});

		it('no uppercase', () => {
			CreateUser.textChange('createPassword', 'aa111111');
			CreateUser.textChange('createConfirmPassword', 'aa111111');
			field.at(0).simulate('click');
			props.setErrorText.should.have.been.called;
		});

		it('no digit', () => {
			CreateUser.textChange('createPassword', 'aAaAaAaA');
			CreateUser.textChange('createConfirmPassword', 'aAaAaAaA');
			field.at(0).simulate('click');
			props.setErrorText.should.have.been.called;
		});

	});

});
