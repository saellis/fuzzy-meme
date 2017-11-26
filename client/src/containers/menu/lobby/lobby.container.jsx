import { connect } from 'react-redux'
import { Lobby } from '../../../components/menu/lobby/lobby.component.jsx';

export const mapStateToProps = state => {
  return {
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
  }
}

export const LobbyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);


export default LobbyContainer;
