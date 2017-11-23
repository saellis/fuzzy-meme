import React, { Component } from 'react';
import './root.css';

import UserPortalContainer from './containers/login/userPortal.container.jsx';

class App extends Component {
	render() {
		return (
      <div className="App">
        <UserPortalContainer />
      </div>
		);
	}
}

export default App;
