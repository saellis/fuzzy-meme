import React from 'react';

import { Col, Panel, Button } from 'react-bootstrap';

export class Games extends React.Component{
	constructor(props){
		super(props);
		this.state = {}
	}

	componentWillMount(){
		this.props.loadGames(this.props._id);
	}


	render(){

		return(
			<Col xs={10} sm={10}  md={6} lg={6} xsOffset={1} smOffset={1} mdOffset={3} lgOffset={3} >
				<Panel bsStyle='warning' header='It me'>
					{this.props.gamesList.map((game, index)=> {
						return(<div key={`${index}menuGameList`}>{index + 1}. {game.creator_id}</div>)
					})}
					<Button block className='btn-success' onClick={() => this.props.createGame(this.props._id)}>Create</Button>
				</Panel>
			</Col>
		)}
}

export default Games;
