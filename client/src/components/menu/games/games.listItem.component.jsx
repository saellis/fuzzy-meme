import React from 'react';

import { Col, Panel, Button, ListGroup, ListGroupItem } from 'react-bootstrap';



export class GamesListItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {createModalShow : false}
	}

	componentWillMount(){
		//this.props.loadGames(this.props._id);
	}


	render(){

		return(
      <div
        className="list-group-item"
        onClick={() => {alert('asd')}}
      >
        {this.props.children}
      </div>
		)}
}

export default GamesListItem;
