import React from 'react';

import { Col, Panel, Button } from 'react-bootstrap';

import { CreateGameModalContainer } from '../../../containers/menu/games/create.game.modal.container.jsx';


export class Games extends React.Component{
	constructor(props){
		super(props);
		this.state = {createModalShow : false}
	}

	componentWillMount(){
		this.props.loadGames(this.props._id);
	}

	createModalOn(){
		this.setState({createModalShow: true});
	}

	createModalOff(){
		this.setState({createModalShow: false});
	}

	async createFromModal(name){
		try{
			await this.props.createGame(this.props._id,name);
			this.createModalOff();
		}catch(err){
			console.log(err);
			//do something, maybe in actions
		}
	}

	render(){

		return(
			<Col xs={10} sm={10}  md={6} lg={6} xsOffset={1} smOffset={1} mdOffset={3} lgOffset={3} >
				<Panel bsStyle='warning' header='It me'>
					{this.props.gamesList ? this.props.gamesList.map((game, index)=> {
						return(<div key={`${index}menuGameList`}>{index + 1}. {game.name}</div>)
					}) : null}
					<Button block className='btn-success' onClick={() => this.createModalOn()}>Create</Button>
					<CreateGameModalContainer show={this.state.createModalShow} pending={this.props.createPending}
						createGame={(name) => this.createFromModal(name)} close={() => this.createModalOff()}/>
				</Panel>
			</Col>
		)}
}

export default Games;
