import React, { Component } from 'react';
import './root.css';

import UserPortal from './components/login/userPortal.component.jsx';

class App extends Component {
	render() {
		return (
      <div className="App">
        <UserPortal />
      </div>
		);
	}
}

export default App;
