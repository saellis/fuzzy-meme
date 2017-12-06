import { CreateUser } from '../createUser.component.jsx';
import { LoginFieldContainer } from '../../../containers/login/loginField.container.jsx';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { createUserAction }  from '../../../actions/login/createUser.actions';
import { Button } from 'react-bootstrap';

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe.only('<CreateUser>', () => {
	var wrapper;
	var props;

	beforeEach(() => {
		props = {
			createUser: jest.fn(),
			setErrorText: jest.fn(),
			clearErrorText: jest.fn(),
			errors: ['error'],
			fields: {}
		};
		wrapper = renderer.create(<Provider store={mockStore({})}><CreateUser {...props}/></Provider>);
	});

	test('~~snapshot', () => {
		expect(wrapper.toJSON()).toMatchSnapshot();
	});
	describe('functionality', () => {
		beforeEach(() => {
			wrapper = shallow(<CreateUser {...props}/>);
		});

		test('should save on keypress', () => {
			wrapper.find(LoginFieldContainer).forEach((field) => {
				field.props().textChange(field.props().id, 'test');
				expect(wrapper.state().fields[field.props().id]).toBe('test');
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

			test('correct data', () => {
				field.at(0).simulate('click');
				expect(props.createUser.mock.calls.length).toBeGreaterThan(0);
			});

			test('invalid username', () => {
				wrapper.setState((prevState) => {
					let newState = prevState;
					newState.fields['createUsername'] = 'A1';
					return newState;
				});
				field.at(0).simulate('click');
				expect(props.setErrorText.mock.calls.length).toBeGreaterThan(0);
			});

			test('non-matching passwords', () => {
				wrapper.setState((prevState) => {
					let newState = prevState;
					newState.fields['createPassword'] = 'AA111111';
					newState.fields['createConfirmPassword'] = 'AA112111';
					return newState;
				});
				field.at(0).simulate('click');
				expect(props.setErrorText.mock.calls.length).toBeGreaterThan(0);
			});

			test('no lower case', () => {
				wrapper.setState((prevState) => {
						let newState = prevState;
						newState.fields['createPassword'] = 'AA111111';
						newState.fields['createConfirmPassword'] = 'AA111111';
						return newState;
					});
				field.at(0).simulate('click');
				expect(props.setErrorText.mock.calls.length).toBeGreaterThan(0);
			});

			test('password too short', () => {
				wrapper.setState((prevState) => {
						let newState = prevState;
						newState.fields['createPassword'] = 'AA1111';
						newState.fields['createConfirmPassword'] = 'AA1111';
						return newState;
					});
				field.at(0).simulate('click');
				expect(props.setErrorText.mock.calls.length).toBeGreaterThan(0);
			});

			test('no uppercase', () => {
				wrapper.setState((prevState) => {
						let newState = prevState;
						newState.fields['createPassword'] = 'aa111111';
						newState.fields['createConfirmPassword'] = 'aa111111';
						return newState;
					});
				field.at(0).simulate('click');
				expect(props.setErrorText.mock.calls.length).toBeGreaterThan(0);
			});

			test('no digit', () => {
				wrapper.setState((prevState) => {
						let newState = prevState;
						newState.fields['createPassword'] = 'aAaAaAaA';
						newState.fields['createConfirmPassword'] = 'aAaAaAaA';
						return newState;
					});
				field.at(0).simulate('click');
				expect(props.setErrorText.mock.calls.length).toBeGreaterThan(0);
			});
		});
	})

});
