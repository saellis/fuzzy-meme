import React from 'react';

import { Col, Panel, Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export class CreateGameModal extends React.Component{
	constructor(props){
		super(props);
		this.state = {name: '', invites: ''};
	}

	render(){

		return(
			<div>
				<Modal show={this.props.show} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create a game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
						<FormGroup>
							<FormControl type='text' ref='createGames input'
								placeholder='Name'
								onChange={(event) => this.setState({value: event.target.value})} />
							</FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.props.createGame(this.state.name)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
		)}
}

export default CreateGameModal;
