import React, { Component } from 'react';
import './root.css';

import LoginContainer from './containers/login/login.container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginContainer />
      </div>
    );
  }
}

export default App;
