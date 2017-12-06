import UserPortal from '../userPortal.component.jsx';
import LoginContainer from '../../../containers/login/login.container.jsx';
import CreateUserContainer from '../../../containers/login/createUser.container.jsx';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { Tabs, TabPanel, TabList, Tab } from 'react-tabs';


describe('<UserPortal>', () => {
	var wrapper;
	beforeEach(() => {
		wrapper = shallow(<UserPortal />);
	});

	test('should have two tabs', () => {
		expect(wrapper.find(Tab)).toHaveLength(2);
		expect(wrapper.find(TabPanel)).toHaveLength(2);
	});

	test('should have a login section', () => {
		expect(wrapper.find(LoginContainer)).toHaveLength(1);
	});

	test('should have a create user section', () => {
		expect(wrapper.find(CreateUserContainer)).toHaveLength(1);
	});


});
