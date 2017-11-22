import { connect } from 'react-redux'
import Login from '../../components/login/login.component.jsx';

import { loginAction }  from '../../actions/users.actions';

export const mapStateToProps = state => {
  return {
  	  	syntaxErrorText: state.users.loginErrorText
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
    login: (un, pw) => {dispatch(loginAction(un, pw))}
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login.Login);


export default LoginContainer;
