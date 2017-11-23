import { CreateUser } from '../createUser.component.jsx';
import { LoginFieldContainer } from '../../../containers/login/loginField.container.jsx';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { createUserAction }  from '../../../actions/users.actions';
import { Button } from 'react-bootstrap';


describe('<CreateUser>', () => {
	var wrapper;
	var props;
	beforeEach(() => {
		props = {
			createUser: sinon.spy(),
			setErrorText: sinon.spy(),
	    clearErrorText: sinon.spy(),
	    setFieldData: sinon.spy(),
			errors: ['error'],
	    fields: {}
		};
		wrapper = shallow(<CreateUser {...props} />);
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
		const field = wrapper.find(Button);
		field.should.have.length(1);
		field.at(0).simulate('click');
		props.setErrorText.should.have.been.called;
	});


	it('should save on keypress', () => {
		wrapper.find(LoginFieldContainer).forEach((field) => {
			field.props().textChange(field.props().id, 'test');
			wrapper.state().fields[field.props().id].should.equal('test');
		});
	});

	describe('form validation', () => {
		var field;
		beforeEach(() => {
			wrapper.setState((prevState) => {
				let newState = prevState;
				newState.fields['createUsername'] = 'abcabcabc';
				newState.fields['createPassword'] = 'Aa111111';
				newState.fields['createConfirmPassword'] = 'Aa111111';
				return newState;
			});
			field = wrapper.find(Button);
		});

		it('correct data', () => {
			field.at(0).simulate('click');
			props.createUser.should.have.been.called;
		});

		it('invalid username', () => {
			wrapper.setState((prevState) => {
				let newState = prevState;
				newState.fields['createUsername'] = 'A1';
				return newState;
			});
			field.at(0).simulate('click');
			props.setErrorText.should.have.been.called;
		});

		it('non-matching passwords', () => {
			wrapper.setState((prevState) => {
				let newState = prevState;
				newState.fields['createPassword'] = 'AA111111';
				newState.fields['createConfirmPassword'] = 'AA112111';
				return newState;
			});
			field.at(0).simulate('click');
			props.setErrorText.should.have.been.called;
		});

		it('no lower case', () => {
			wrapper.setState((prevState) => {
					let newState = prevState;
					newState.fields['createPassword'] = 'AA111111';
					newState.fields['createConfirmPassword'] = 'AA111111';
					return newState;
				});
			field.at(0).simulate('click');
			props.setErrorText.should.have.been.called;
		});

		it('password too short', () => {
			wrapper.setState((prevState) => {
					let newState = prevState;
					newState.fields['createPassword'] = 'AA1111';
					newState.fields['createConfirmPassword'] = 'AA1111';
					return newState;
				});
			field.at(0).simulate('click');
			props.setErrorText.should.have.been.called;
		});

		it('no uppercase', () => {
			wrapper.setState((prevState) => {
					let newState = prevState;
					newState.fields['createPassword'] = 'aa111111';
					newState.fields['createConfirmPassword'] = 'aa111111';
					return newState;
				});
			field.at(0).simulate('click');
			props.setErrorText.should.have.been.called;
		});

		it('no digit', () => {
			wrapper.setState((prevState) => {
					let newState = prevState;
					newState.fields['createPassword'] = 'aAaAaAaA';
					newState.fields['createConfirmPassword'] = 'aAaAaAaA';
					return newState;
				});
			field.at(0).simulate('click');
			props.setErrorText.should.have.been.called;
		});
	});
});
