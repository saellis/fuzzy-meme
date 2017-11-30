import { connect } from 'react-redux'
import { Menu } from '../../components/menu/menu.component.jsx';
import { returnHome } from '../../actions/util/util.actions.js'

export const mapStateToProps = state => {
  return {
    loggedInId : state.users.login.user._id
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
    returnHome: () => dispatch(returnHome())
  }
}

export const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);


export default MenuContainer;
