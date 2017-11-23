import { connect } from 'react-redux'
import UserPortal from '../../components/login/userPortal.component.jsx';

import { clearCreateUser, clearLogin }  from '../../actions/users.actions';

export const mapStateToProps = state => {
  return {
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
    clearCreateUser: () => {dispatch(clearCreateUser())},
    clearLogin: () => {dispatch(clearLogin())}
  }
}

const UserPortalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPortal);


export default UserPortalContainer;
