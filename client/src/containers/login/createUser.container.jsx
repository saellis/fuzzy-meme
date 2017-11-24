import { connect } from 'react-redux'
import { CreateUser } from '../../components/login/createUser.component.jsx';

import { createUserAction, setCreateUserSyntaxError, clearCreateUserSyntaxError } from '../../actions/users.actions';


export const mapStateToProps = state => {
  return {
  	errors: state.users.create.syntaxErrors,
    creationErrorText: state.users.create.errorText
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
    setErrorText: (errors) => {dispatch(setCreateUserSyntaxError(errors))},
    clearErrorText: () => {dispatch(clearCreateUserSyntaxError())},
    createUser: (un, pw) => {dispatch(createUserAction(un, pw))},
  }
}

const CreateUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser)


export default CreateUserContainer;
