import React from 'react';

import { Button, Modal, FormControl, FormGroup, ButtonGroup, ControlLabel,
	ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

export class CreateGameModal extends React.Component{
	constructor(props){
		super(props);
		this.state = {name: '', invites: {}};
		this.props.loadUsersList();
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

							<ControlLabel>Name your game:</ControlLabel>
							<FormControl type='text' ref='createGamesInput'
								placeholder='Name (optional)' disabled={this.props.pending}
								onChange={(event) => this.setState({name: event.target.value})} />

							<br />

							<ControlLabel>Invite:</ControlLabel>
					    <ButtonToolbar>
					      <ToggleButtonGroup type="checkbox">
									{this.props.usersList.map((el, index) => {
										return (<ToggleButton value={index}>{el.username}</ToggleButton>);
									})}
					      </ToggleButtonGroup>
					    </ButtonToolbar>
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
