import { connect } from 'react-redux'
import user from '../../components/login/login.component';

import { loginAction }  from '../../actions/users.actions';

const mapStateToProps = state => {
  return {
  	un: state.users.fields.loginUsername,
  	pw: state.users.fields.loginPassword,
  }
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