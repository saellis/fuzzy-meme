import React from 'react';
import ReactDOM from 'react-dom'

import { FormControl, FormGroup, ControlLabel , Col} from 'react-bootstrap';

export default class LoginField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.reset = this.reset.bind(this);
	}

	parseType() {
		return this.props.type.toLowerCase().indexOf('password') !== -1 ? 'password' : 'text';
	}

	handleChange(event) {
		this.props.textChange(this.props.type, event.target.value);
		this.setState({value: event.target.value});
	}

	reset() {
		this.setState({value: ''});
		ReactDOM.findDOMNode(this.refs[`input`]).value='';
	}

	getValidationState() {
		if(!this.props.regex){
			return null;
		}
		if(this.state.value.match(this.props.regex)){
			return 'success';
		}else if(this.state.value.length > 0){
			return 'error';
		}else{
			return null;
		}

	}

	render() {
		return(
			<FormGroup validationState={this.getValidationState()}>
				<Col xs={2} sm={2}  md={4} lg={4} className='margin-bottom-5'>
					<ControlLabel>{this.props.label}</ControlLabel>
				</Col>
				<Col xs={10} sm={10}  md={8} lg={8}  className='margin-bottom-5' >
					<FormControl type={this.parseType()} ref='input'
						placeholder={this.props.placeholder}
						onChange={(evt) => this.handleChange(evt)} />
				</Col>
			</FormGroup>
		);
	}
};
