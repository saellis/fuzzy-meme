import { connect } from 'react-redux'
import user from '../../components/login/login.component';

import { loginAction }  from '../../actions/users.actions';

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch =>{
  return { 
    login: (un, pw) => {dispatch(loginAction(un, pw))}
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(user)


export default LoginContainer;