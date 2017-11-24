import CreateUserContainer, {mapStateToProps, mapDispatchToProps} from '../createUser.container.jsx';
import {CreateUser} from '../../../components/login/createUser.component.jsx';
import LoginFieldContainer from '../loginField.container.jsx';

import React from 'react';
import { mount, shallow } from 'enzyme';

import configureMockStore from 'redux-mock-store';
const middlewares = [];
const mockStore = configureMockStore(middlewares);

describe('<CreateUserContainer>', () => {
	var wrapper, store, state;
	beforeEach(() => {
		state = {
			users:
			{
				createUserSyntaxErrors: []
			}
		};
		store = mockStore(state);
		wrapper = shallow(<CreateUserContainer store={store}/>);
	});

	it('should have passed errors down', () => {
		const field = wrapper.find(CreateUser);
		field.should.have.length(1);
		field.at(0).props().errors.should.deep.equal(state.users.createUserSyntaxErrors);
	});

	it('should have setErrorText, clearErrorText, createUser functions set', () => {
		const field = wrapper.find(CreateUser);
		field.should.have.length(1);
		field.at(0).props().setErrorText.should.be.a('function');
		field.at(0).props().clearErrorText.should.be.a('function');
		field.at(0).props().createUser.should.be.a('function');
	});

	it('mapStateToProps should set errorText', () => {
		mapStateToProps(state).should.deep.equal({errors: state.users.createUserSyntaxErrors, fields: state.users.fields});
	});

	it('mapDispatchToProps should set three functions', () => {
		const dispatch = sinon.spy();
		const funcs = mapDispatchToProps(dispatch);
		funcs['setErrorText']('test');
		funcs['clearErrorText']();
		funcs['createUser']('un','pw');
		dispatch.should.have.callCount(3);
	});


});
