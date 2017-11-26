import { connect } from 'react-redux'
import { Games } from '../../../components/menu/games/games.component.jsx';

export const mapStateToProps = state => {
  return {
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
  }
}

export const GamesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);


export default GamesContainer;
