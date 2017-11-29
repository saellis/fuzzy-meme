import React from 'react';
import ReactDOM from 'react-dom';

import UserPortalContainer from '../containers/login/userPortal.container.jsx';
import MenuContainer from '../containers/menu/menu.container.jsx';


export class Routes extends React.Component{

  render(){
      return(<diV>{this.props.component}</diV>)
  }
}
