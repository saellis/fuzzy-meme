import { connect } from 'react-redux'
import { Games } from '../../../components/menu/games/games.component.jsx';
import { createGameAction, loadGamesAction } from '../../../actions/menu/games/menu.games.actions.js';

export const mapStateToProps = state => {
  return {
    gamesList: state.menu.games.gameList,
    createPending: state.menu.games.createPending
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
    createGame: (uid, name, invites) => dispatch(createGameAction(uid, name, invites)),
    loadGames: (uid) => dispatch(loadGamesAction(uid))
  }
}

export const GamesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);


export default GamesContainer;
