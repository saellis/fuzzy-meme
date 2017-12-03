import React from 'react';

import { Col, Panel, Button, Modal, FormControl, FormGroup, ControlLabel, ButtonGroup } from 'react-bootstrap';

export class CreateGameModal extends React.Component{
	constructor(props){
		super(props);
		this.state = {name: '', invites: {}};
	}

	render(){

		return(
			<div>
				<Modal show={this.props.show} onHide={this.props.close}>
          <Modal.Header closeButton={!this.props.pending}>
            <Modal.Title>Create a game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
						<FormGroup>
							<FormControl type='text' ref='createGamesInput'
								placeholder='Name' disabled={this.props.pending}
								onChange={(event) => this.setState({name: event.target.value})} />
						</FormGroup>
          </Modal.Body>
          <Modal.Footer>
						<ButtonGroup>
							<Button onClick={this.props.close} className='btn-danger'>Close</Button>
            	<Button onClick={() => this.props.createGame(this.state.name)} disabled={this.props.pending} className='btn-success'>Create</Button>
						</ButtonGroup>
          </Modal.Footer>
        </Modal>
      </div>
		)}
}

export default CreateGameModal;
