import React from 'react';

import UserPortalContainer from '../containers/login/userPortal.container.jsx';
import MenuContainer from '../containers/menu/menu.container.jsx';


import * as constants from '../constants/routes.constants.js'


export class Routes extends React.Component{
  // constructor(props){
  //   super(props);
  // }

  route(){
    switch(this.props.component){
      case constants.MENU:
        return <MenuContainer />
      case constants.HOME:
      default:
        return <UserPortalContainer />
    }
  }

  render(){
      return(this.route())
  }
}
