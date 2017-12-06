import { connect } from 'react-redux'
import { Login } from '../../components/login/login.component.jsx';

import { loginAction }  from '../../actions/login/login.actions';

export const mapStateToProps = state => {
  return {
  	  	errorText: state.users.login.form.errorText,
        pending: state.users.login.form.pending
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
    login: (un, pw) => {dispatch(loginAction(un, pw))}
  }
}

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);


export default LoginContainer;
