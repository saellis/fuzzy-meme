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
      <ListGroupItem
				bsStyle="info"
        className="list-group-item list-group-item-action flex-column align-items-start"
        onClick={() => {}}
      >

				<div className="d-flex w-100 justify-content-between">
      <span className="h5 mb-1">{this.props.children}</span>
      <small className='pull-right'>3 days ago</small>
    </div>
    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small>Donec id elit non mi porta.</small>
      </ListGroupItem>
		)}
}

export default GamesListItem;
