
import { MenuContainer } from '../containers/menu/menu.container.jsx';
import  UserPortalContainer from '../containers/login/userPortal.container.jsx';


export const routes = {
  HOME: {
    component: UserPortalContainer
  },
  MENU: {
    component: MenuContainer
  }

}

export const HOME = 'HOME';
export const MENU = 'MENU';
