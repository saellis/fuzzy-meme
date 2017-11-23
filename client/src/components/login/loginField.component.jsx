import React from 'react';

import { FormControl, FormGroup, ControlLabel , Col} from 'react-bootstrap';

const LoginField =  (props) => {
	return (
		<div>
			<FormGroup >
				<Col xs={4} sm={4}  md={4} lg={4} className='margin-bottom-5'>
					<ControlLabel>{props.label}</ControlLabel>
				</Col>
				<Col xs={10} sm={10}  md={8} lg={8}  className='margin-bottom-5' >
					<FormControl type={props.type.toLowerCase().indexOf('password') !== -1 ? 'password' : 'text'}
						placeholder={props.placeholder}
						onChange={(evt) => props.textChange(props.type, evt.target.value)} />
				</Col>
			</FormGroup>
		</div>
	)}


export default LoginField;
