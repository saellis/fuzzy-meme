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

	it('should have two tabs', () => {
		wrapper.find(Tab).should.have.length(2);
		wrapper.find(TabPanel).should.have.length(2);
	});

	it('should have a login section', () => {
		wrapper.find(LoginContainer).should.have.length(1);
	});

	it('should have a create user section', () => {
		wrapper.find(CreateUserContainer).should.have.length(1);
	});


});
