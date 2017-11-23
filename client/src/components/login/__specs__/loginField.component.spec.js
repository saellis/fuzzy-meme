import LoginField from '../loginField.component.jsx';

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
			textChange={spy}/>);
		wrapper.find(FormControl).html().indexOf('type="password"').should.not.equal(-1);
	});

	it('should have normal style input', () => {
		const wrapper = shallow(<LoginField type='asdsd' placeholder='testing'
			textChange={spy}/>);
		wrapper.find(FormControl).html().indexOf('type="text"').should.not.equal(-1);
	});

	it('should have change function', () => {
		const wrapper = shallow(<LoginField type='asdsd' placeholder='testing'
			textChange={spy}/>);
		wrapper.find(FormControl).simulate('change', {target:{value:'a'}});
		spy.should.have.been.called;
	});

	it('should have accept label', () => {
		const wrapper = shallow(<LoginField type='asdsd' placeholder='testing' label='assdadddas'
			textChange={spy}/>);
		wrapper.find(ControlLabel).html().indexOf('assdadddas').should.not.equal(-1);
	});

});
