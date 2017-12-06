/*eslint-disable no-unused-vars no-undef */

import LoginContainer, {mapStateToProps, mapDispatchToProps} from '../login.container.jsx';
import { Login } from '../../../components/login/login.component.jsx';
import LoginFieldContainer from '../loginField.container.jsx';

import React from 'react';
import { mount, shallow } from 'enzyme';

import configureMockStore from 'redux-mock-store';
const middlewares = [];
const mockStore = configureMockStore(middlewares);

describe('<LoginContainer>', () => {
	var wrapper, store, state;
	beforeEach(() => {
		state = {
			users:
			{
				login:{
					form:{
						errorText: 'test',
						pending: false
					}
				}
			}
		};
		store = mockStore(state);
		wrapper = shallow(<LoginContainer store={store}/>);
	});

	test('should have passed error text down', () => {
		const field = wrapper.find(Login);
		expect(field).toHaveLength(1);
		expect(field.at(0).props().errorText).toBe('test');
	});

	test('should have login function set', () => {
		const field = wrapper.find(Login);
		expect(field).toHaveLength(1);
		expect(typeof field.at(0).props().login).toBe('function');
	});

	test('mapStateToProps should set syntaxErrorText', () => {
		expect(mapStateToProps(state)).toEqual({errorText: state.users.login.form.errorText,
			pending: state.users.login.form.pending});
	});

	test('mapDispatchToProps should set three functions', () => {
		const dispatch = jest.fn();
		const funcs = mapDispatchToProps(dispatch);
		funcs['login']('un','pw');
		expect(dispatch.mock.calls.length).toBe(1);
	});


});
