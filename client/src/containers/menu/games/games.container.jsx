import { connect } from 'react-redux'
import { Games } from '../../../components/menu/games/games.component.jsx';
import { createGameAction, loadGamesAction } from '../../../actions/menu/games/menu.games.actions.js';

export const mapStateToProps = state => {
  return {
    gamesList: state.menu.games.gameList
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
    createGame: (uid) => dispatch(createGameAction(uid)),
    loadGames: (uid) => dispatch(loadGamesAction(uid))
  }
}

export const GamesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);


export default GamesContainer;
