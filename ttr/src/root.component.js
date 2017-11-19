import React, { Component } from 'react';
import './root.css';

import LoginContainer from './containers/login/login.container';
import CreateUserContainer from './containers/login/createUser.container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginContainer />
        <CreateUserContainer />
      </div>
    );
  }
}

export default App;
