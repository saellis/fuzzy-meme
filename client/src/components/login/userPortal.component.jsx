import React from 'react'
import LoginContainer from '../../containers/login/login.container.jsx'
import CreateUserContainer from '../../containers/login/createUser.container.jsx'

import { Tabs, TabPanel, TabList, Tab } from 'react-tabs'
import { Col } from 'react-bootstrap';

export class userPortal extends React.Component{
	constructor(props){
		super(props);
		this.state = {tabIndex : 0}
	}

	clearOldTab(currentTab){
		if(currentTab === 0){
			this.props.clearCreateUser();
		}else if(currentTab === 1){
			this.props.clearLogin();
		}
	}

	render(){
		return(
			<Tabs selectedIndex={this.state.tabIndex}
				onSelect={tabIndex => {this.setState({ tabIndex: tabIndex });
															this.clearOldTab(tabIndex)}}>
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
		)
	}
}

export default userPortal;
