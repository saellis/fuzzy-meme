import { connect } from 'react-redux'
import { CreateGameModal } from '../../../components/menu/games/create.game.modal.component.jsx';
import { createGameAction, loadGamesAction } from '../../../actions/menu/games/menu.games.actions.js';

export const mapStateToProps = state => {
  return {
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
  }
}

export const CreateGameModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGameModal);


export default CreateGameModalContainer;
