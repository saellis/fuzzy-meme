import React from 'react'
import LoginContainer from '../../containers/login/login.container.jsx'
import CreateUserContainer from '../../containers/login/createUser.container.jsx'

import { Tabs, TabPanel, TabList, Tab } from 'react-tabs'

const userPortal =  (props) => {

	return(
		<div>
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
		</div>
	)
}

export default userPortal;
