import LoginField from '../loginField.component.jsx';

import React from 'react';
import { mount, shallow } from 'enzyme';


describe('<LoginField>', () => {
	it('should have password style input', () => {
		const wrapper = shallow(<LoginField type='password' placeholder='testing'
			textChange={() => {}}/>);
		expect(wrapper.find('input').html().indexOf('type="password"')).not.to.equal(-1);
	});
	it('should have normal style input', () => {
		const wrapper = shallow(<LoginField type='asdsd' placeholder='testing'
			textChange={() => {}}/>);
		expect(wrapper.find('input').html().indexOf('type="text"')).not.to.equal(-1);
	});
	it('should have change function', () => {
		var success = false;
		const wrapper = shallow(<LoginField type='asdsd' placeholder='testing'
			textChange={(evt) => {success = true}}/>);
		wrapper.find('input').simulate('change', {target:{value:'a'}});
		expect(success).to.equal(true);
	});

});