import LoginField from '../loginField.component.jsx';

import { regex } from '../../../constants/users.constants.js'

import React from 'react';
import { mount, shallow } from 'enzyme';

import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('<LoginField>', () => {
	var spy;

	beforeEach(() => {
		spy = jest.fn();
	});

	test('should have password style input', () => {
		const wrapper = shallow(<LoginField type='password' placeholder='testing'
			textChange={spy} regex={regex.username.regex}/>);
		expect(wrapper.find(FormControl).html().indexOf('type="password"')).not.toBe(-1);
	});

	test('should have normal style input', () => {
		const wrapper = shallow(<LoginField type='asdadas' placeholder='testing'
			textChange={spy} regex={regex.username.regex} />);
		expect(wrapper.find(FormControl).html().indexOf('type="text"')).not.toBe(-1);
	});

	test('should have change function', () => {
		const wrapper = shallow(<LoginField type='asdasfasd' placeholder='testing'
			textChange={spy} regex={regex.username.regex} />);
		wrapper.find(FormControl).simulate('change', {target:{value:'a'}});
		expect(spy.mock.calls.length).toBeGreaterThan(0);
	});

	test('should have accept label', () => {
		const wrapper = shallow(<LoginField type='asdasd' placeholder='testing'
			textChange={spy} regex={regex.username.regex} label='asddsa'/>);
		expect(wrapper.find(ControlLabel).html().indexOf('asddsa')).not.toBe(-1);
	});

	test('should have accept no regex', () => {
		const wrapper = shallow(<LoginField type='asdasd' placeholder='testing'
			textChange={spy} label='asddsa'/>);
		wrapper.find(FormControl).simulate('change', {target:{value:'a'}});

		expect(wrapper.instance().getValidationState()+"").toBe('null');
	});

	test('should have success when matching regex', () => {
		const wrapper = shallow(<LoginField type='asdasd' placeholder='testing'
			textChange={spy} regex={/.*/} label='asddsa'/>);
		wrapper.find(FormControl).simulate('change', {target:{value:'a'}});
		expect(wrapper.instance().getValidationState()+"").toBe('success');
	});

	test('should have error when mismatching regex', () => {
		const wrapper = shallow(<LoginField type='asdasd' placeholder='testing'
			textChange={spy} regex={/\d+/} label='asddsa'/>);
		wrapper.find(FormControl).simulate('change', {target:{value:'aaaaaa'}});
		wrapper.find(FormControl).simulate('change', {target:{value:'aaaaaab'}});
		expect(wrapper.instance().getValidationState()+"").toBe('error');
	});

	test('should have null when empty', () => {
		const wrapper = shallow(<LoginField type='asdasd' placeholder='testing'
			textChange={spy} regex={/.{2,}/} label='asddsa'/>);
		wrapper.find(FormControl).simulate('change', {target:{value:''}});
		expect(wrapper.instance().getValidationState()+"").toBe('null');
	});
});
