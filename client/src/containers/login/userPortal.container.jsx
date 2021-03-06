import { connect } from 'react-redux'
import UserPortal from '../../components/login/userPortal.component.jsx';

import { clearLogin }  from '../../actions/login/login.actions';
import { clearCreateUser }  from '../../actions/login/createUser.actions';

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

export const UserPortalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPortal);


export default UserPortalContainer;
