import { connect } from 'react-redux'
import { Invites } from '../../../components/menu/invites/invites.component.jsx';

export const mapStateToProps = state => {
  return {
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
  }
}

export const InvitesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Invites);


export default InvitesContainer;
