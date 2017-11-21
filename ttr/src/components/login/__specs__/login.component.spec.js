import Login from '../login.component.jsx';
import LoginFieldContainer from '../../../containers/login/loginField.container.jsx';

import React from 'react';
import { Button } from 'react-dom'
import { mount, shallow } from 'enzyme';
import { loginAction }  from '../../../actions/users.actions';


describe('<Login>', function () {
	var wrapper;
	beforeEach(() => {
		wrapper = shallow(<Login.Login />);
	})
	it('should have two inputs', function () {
		expect(wrapper.find(LoginFieldContainer)).to.have.length(2);
	});

	it('first input should be for username', () => {
		const field = wrapper.find(LoginFieldContainer).at(0);
		expect(field.props().id).to.match(/username$/i);
		expect(field.props().type).to.match(/username$/i);
		expect(field.props().placeholder).to.match(/username$/i);
		expect(field.props().textChange).to.be.a('function');
	});

	it('second input should be for password', () => {
		const field = wrapper.find(LoginFieldContainer).at(1);
		expect(field.props().id).to.match(/password$/i);
		expect(field.props().type).to.match(/password$/i);
		expect(field.props().placeholder).to.match(/password$/i);
		expect(field.props().textChange).to.be.a('function');
	});

	it('should have a button', function () {
		const field = wrapper.find('button');
		expect(field).to.have.length(1);
		expect(true).to.equal(false);
	});

	it('should save on keypress', () => {
		wrapper.find(LoginFieldContainer).forEach((field) => {
			field.props().textChange(field.props().id, 'test');
			expect(Login.getFields()[field.props().id]).to.equal('test');
		})
	});

});