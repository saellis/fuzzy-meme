import React from 'react'
import LoginContainer from '../../containers/login/login.container.jsx'
import CreateUserContainer from '../../containers/login/createUser.container.jsx'

import { Tabs, TabPanel, TabList, Tab } from 'react-tabs'
import { Col } from 'react-bootstrap';

const userPortal =  (props) => {

	return(

			<Col xs={10} sm={10}  md={6} lg={6} xsOffset={1} smOffset={1} mdOffset={3} lgOffset={3} >
			<Tabs>
				<TabList>
					<Tab>Login</Tab>
					<Tab>Create</Tab>
				</TabList>
				<TabPanel>
					<LoginContainer />
				</TabPanel>
				<TabPanel>
					<CreateUserContainer />
				</TabPanel>
			</Tabs>
		</Col>
	)
}

export default userPortal;
