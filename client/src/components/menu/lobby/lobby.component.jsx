import React from 'react';

import { Col, Panel } from 'react-bootstrap';
export class Lobby extends React.Component{
	constructor(props){
		super(props);
		this.state = {}
	}


	render(){

		return(
			<Col xs={10} sm={10}  md={6} lg={6} xsOffset={1} smOffset={1} mdOffset={3} lgOffset={3} >
				<Panel bsStyle='warning' header='It me'>
it me lobby
				</Panel>
			</Col>
		)}
}

export default Lobby;
