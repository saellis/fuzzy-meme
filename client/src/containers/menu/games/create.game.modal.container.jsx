import { connect } from 'react-redux'
import { CreateGameModal } from '../../../components/menu/games/create.game.modal.component.jsx';
import { loadUsersAction } from '../../../actions/menu/invites/menu.invites.actions.js';

export const mapStateToProps = state => {
  return {
    usersList: state.menu.invites.usersList,
    loadUsersPending: state.menu.invites.loadUsersPending
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
    loadUsersList: () => dispatch(loadUsersAction())
  }
}

export const CreateGameModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGameModal);


export default CreateGameModalContainer;
