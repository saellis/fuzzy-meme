import Login from '../login.component.jsx';
import LoginFieldContainer from '../../../containers/login/loginField.container.jsx';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { loginAction }  from '../../../actions/users.actions';
import { Button } from 'react-bootstrap';


describe('<Login>', () => {
	var wrapper, props;
	beforeEach(() => {
		props = {
			login: sinon.spy()
		};
		wrapper = shallow(<Login.Login {...props}/>);
	});

	it('should have two inputs', () => {
		wrapper.find(LoginFieldContainer).should.have.length(2);
	});

	it('first input should be for username', () => {
		const field = wrapper.find(LoginFieldContainer).at(0);
		field.props().id.should.match(/username$/i);
		field.props().type.should.match(/username$/i);
		field.props().placeholder.should.match(/username$/i);
		field.props().textChange.should.be.a('function');
	});

	it('second input should be for password', () => {
		const field = wrapper.find(LoginFieldContainer).at(1);
		field.props().id.should.match(/password$/i);
		field.props().type.should.match(/password$/i);
		field.props().placeholder.should.match(/password$/i);
		field.props().textChange.should.be.a('function');
	});

	it('should have a button', () => {
		const field = wrapper.find(Button);
		expect(field).to.have.length(1);
		field.at(0).simulate('click');
		props.login.should.have.been.called;
	});

	it('should save on keypress', () => {
		wrapper.find(LoginFieldContainer).forEach((field) => {
			field.props().textChange(field.props().id, 'test');
			Login.getFields()[field.props().id].should.equal('test');
		});
	});

});
