import React from 'react';

import { Col, Panel } from 'react-bootstrap';

import { Tabs, TabPanel, TabList, Tab } from 'react-tabs';

import { GamesContainer } from '../../containers/menu/games/games.container.jsx'
import { InvitesContainer } from '../../containers/menu/invites/invites.container.jsx'
import { LobbyContainer } from '../../containers/menu/lobby/lobby.container.jsx'

export class Menu extends React.Component{
	constructor(props){
		super(props);
		this.state = {tabIndex: 0}
	}

	clearOldTab(currentTab){
		if(currentTab === 0){
		}else if(currentTab === 1){
		}
	}

	render(){

		return(
			<Col xs={10} sm={10}  md={6} lg={6} xsOffset={1} smOffset={1} mdOffset={3} lgOffset={3} >
				<Panel bsStyle='warning' header='It me'>
					<Tabs selectedIndex={this.state.tabIndex}
						onSelect={tabIndex => {this.setState({ tabIndex: tabIndex });
																	this.clearOldTab(tabIndex)}}>
						<TabList>
							<Tab>My Games</Tab>
							<Tab>Invites</Tab>
							<Tab>Lobby</Tab>
						</TabList>
						<TabPanel>
							<GamesContainer />
						</TabPanel>
						<TabPanel>
							<InvitesContainer />
						</TabPanel>
						<TabPanel>
							<LobbyContainer />
						</TabPanel>
					</Tabs>
				</Panel>
			</Col>
		)}
}

export default Menu;
