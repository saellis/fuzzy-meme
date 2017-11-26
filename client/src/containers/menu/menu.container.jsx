import { connect } from 'react-redux'
import { Menu } from '../../components/menu/menu.component.jsx';

export const mapStateToProps = state => {
  return {
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
  }
}

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);


export default MenuContainer;
