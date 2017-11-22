import LoginField from '../loginField.component.jsx';

import React from 'react';
import { mount, shallow } from 'enzyme';


describe('<LoginField>', () => {
	var spy;

	beforeEach(() => {
		spy = sinon.spy();
	});

	it('should have password style input', () => {
		const wrapper = shallow(<LoginField type='password' placeholder='testing'
			textChange={spy}/>);
		wrapper.find('input').html().indexOf('type="password"').should.not.equal(-1);
	});

	it('should have normal style input', () => {
		const wrapper = shallow(<LoginField type='asdsd' placeholder='testing'
			textChange={spy}/>);
		wrapper.find('input').html().indexOf('type="text"').should.not.equal(-1);
	});

	it('should have change function', () => {
		const wrapper = shallow(<LoginField type='asdsd' placeholder='testing'
			textChange={spy}/>);
		wrapper.find('input').simulate('change', {target:{value:'a'}});
		spy.should.have.been.called;
	});

});
