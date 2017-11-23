import LoginField from '../loginField.component.jsx';

import { regex } from '../../../constants/users.constants.js'

import React from 'react';
import { mount, shallow } from 'enzyme';

import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';


describe('<LoginField>', () => {
	var spy;

	beforeEach(() => {
		spy = sinon.spy();
	});

	it('should have password style input', () => {
		const wrapper = shallow(<LoginField type='password' placeholder='testing'
			textChange={spy} regex={regex.username.regex}/>);
		wrapper.find(FormControl).html().indexOf('type="password"').should.not.equal(-1);
	});

	it('should have normal style input', () => {
		const wrapper = shallow(<LoginField type='asdadas' placeholder='testing'
			textChange={spy} regex={regex.username.regex} />);
		wrapper.find(FormControl).html().indexOf('type="text"').should.not.equal(-1);
	});

	it('should have change function', () => {
		const wrapper = shallow(<LoginField type='asdasfasd' placeholder='testing'
			textChange={spy} regex={regex.username.regex} />);
		wrapper.find(FormControl).simulate('change', {target:{value:'a'}});
		spy.should.have.been.called;
	});

	it('should have accept label', () => {
		const wrapper = shallow(<LoginField type='asdasd' placeholder='testing'
			textChange={spy} regex={regex.username.regex} label='asddsa'/>);
		wrapper.find(ControlLabel).html().indexOf('asddsa').should.not.equal(-1);
	});

	it('should have accept no regex', () => {
		const wrapper = shallow(<LoginField type='asdasd' placeholder='testing'
			textChange={spy} label='asddsa'/>);
		wrapper.find(FormControl).simulate('change', {target:{value:'a'}});
		(wrapper.state('status')+"").should.equal('null');
	});

	it('should have success when matching regex', () => {
		const wrapper = shallow(<LoginField type='asdasd' placeholder='testing'
			textChange={spy} regex={/.*/} label='asddsa'/>);
		wrapper.find(FormControl).simulate('change', {target:{value:'a'}});
		(wrapper.state('status')+"").should.equal('success');
	});

	it('should have error when mismatching regex', () => {
		const wrapper = shallow(<LoginField type='asdasd' placeholder='testing'
			textChange={spy} regex={/\d+/} label='asddsa'/>);
		wrapper.find(FormControl).simulate('change', {target:{value:'aaaaaa'}});
		wrapper.find(FormControl).simulate('change', {target:{value:'aaaaaab'}});
		(wrapper.state('status')+"").should.equal('error');
	});

	it('should have null when empty', () => {
		const wrapper = shallow(<LoginField type='asdasd' placeholder='testing'
			textChange={spy} regex={/.{2,}/} label='asddsa'/>);
		wrapper.find(FormControl).simulate('change', {target:{value:''}});
		(wrapper.state('status')+"").should.equal('null');
	});
});
