import {Login} from '../login.component.jsx';
import {LoginFieldContainer} from '../../../containers/login/loginField.container.jsx';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { loginAction }  from '../../../actions/login/login.actions';
import { Button } from 'react-bootstrap';

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe.only('<Login>', () => {
	let wrapper, props;
	beforeEach(() => {
		wrapper = renderer.create(<Provider store={mockStore({})}><Login {...props}/></Provider>);
	});

	test('~~snapshot', () => {
		expect(wrapper.toJSON()).toMatchSnapshot();
	});
	describe('functionality', () => {
		beforeEach(() => {
			props = {
				login: jest.fn()
			};
			wrapper = shallow(<Login {...props}/>);
		});

		test('should save on keypress', () => {
			wrapper.find(LoginFieldContainer).forEach((field) => {
				field.props().textChange(field.props().id, 'test');
				expect(wrapper.state().fields[field.props().id]).toBe('test');
			});
		});
	})

});
