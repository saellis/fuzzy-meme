import { connect } from 'react-redux'
import login from '../../components/login/login.component.jsx';

import { loginAction }  from '../../actions/users.actions';

const mapStateToProps = state => {
  return {
  	  	syntaxErrorText: state.users.loginErrorText
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
)(login)


export default LoginContainer;