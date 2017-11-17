import React from 'react'
import PropTypes from 'prop-types'


const User =  ({id, create}) => (
	<div>
		<p>{id}</p>
		<button onClick={() =>
			create()	
		}>
		Click me
		</button>
		</div>
	)


export default User;