import { connect } from 'react-redux'
import createUser from '../../components/login/createUser.component.jsx';

import { createUserAction, setCreateUserSyntaxError, clearCreateUserSyntaxError } from '../../actions/users.actions';

const mapStateToProps = state => {
  return {
  	errorText: state.users.loginErrorText
  }
}

const mapDispatchToProps = dispatch =>{
  return { 
    setErrorText: (text) => {dispatch(setCreateUserSyntaxError(text))},
    clearErrorText: () => {dispatch(clearCreateUserSyntaxError())},
    createUser: (un, pw) => {dispatch(createUserAction(un, pw))}
  }
}

const CreateUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(createUser)


export default CreateUserContainer;