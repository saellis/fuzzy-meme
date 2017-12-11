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
				create:{
				  	syntaxErrors: [],
				    errorText: 'errorText',
				    creationSuccessText: 'successText',
				    shouldResetForm: false,
				    pending: false
				}
			}
		};
		store = mockStore(state);
		wrapper = shallow(<CreateUserContainer store={store}/>);
	});

	test('should have passed errors down', () => {
		const field = wrapper.find(CreateUser);
		expect(field).toHaveLength(1);
		expect(field.at(0).props().errors).toEqual(state.users.create.syntaxErrors);
	});

	test(
        'should have setErrorText, clearErrorText, createUser functions set',
        () => {
            const field = wrapper.find(CreateUser);
            expect(field).toHaveLength(1);
            expect(typeof field.at(0).props().setErrorText).toBe('function');
            expect(typeof field.at(0).props().clearErrorText).toBe('function');
            expect(typeof field.at(0).props().createUser).toBe('function');
        }
    );

	test('mapStateToProps should set errorText', () => {
		expect(mapStateToProps(state)).toEqual({
        errors: state.users.create.syntaxErrors,
        creationErrorText: state.users.create.errorText,
        creationSuccessText: state.users.create.creationSuccessText,
        shouldResetForm: state.users.create.shouldResetForm,
        pending: state.users.create.pending});
	});

	test('mapDispatchToProps should set three functions', () => {
		const dispatch = jest.fn()
		const funcs = mapDispatchToProps(dispatch);
		funcs['setErrorText']('test');
		funcs['clearErrorText']();
		funcs['createUser']('un','pw');
		expect(dispatch.mock.calls.length).toBe(3);
	});


});
