import React from 'react'


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