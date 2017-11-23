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
				loginErrorText: 'test'
			}
		};
		store = mockStore(state);
		wrapper = shallow(<LoginContainer store={store}/>);
	});

	it('should have passed error text down', () => {
		const field = wrapper.find(Login);
		field.should.have.length(1);
		field.at(0).props().syntaxErrorText.should.equal('test');
	});

	it('should have login function set', () => {
		const field = wrapper.find(Login);
		field.should.have.length(1);
		field.at(0).props().login.should.be.a('function');
	});

	it('mapStateToProps should set syntaxErrorText', () => {
		mapStateToProps(state).should.deep.equal({syntaxErrorText: state.users.loginErrorText});
	});

	it('mapDispatchToProps should set three functions', () => {
		const dispatch = sinon.spy();
		const funcs = mapDispatchToProps(dispatch);
		funcs['login']('un','pw');
		dispatch.should.have.callCount(1);
	});


});
