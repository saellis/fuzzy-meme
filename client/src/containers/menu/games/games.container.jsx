import { connect } from 'react-redux'
import { MyGames } from '../../../components/menu/games/games.component.jsx';

export const mapStateToProps = state => {
  return {
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
  }
}

export const MyGamesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyGames);


export default MyGamesContainer;
