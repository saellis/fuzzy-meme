import { connect } from 'react-redux'
import { CreateUser } from '../../components/login/createUser.component.jsx';

import { createUserAction, setCreateUserSyntaxError,
  clearCreateUserSyntaxError, resetCreateFormComplete } from '../../actions/login/createUser.actions';


export const mapStateToProps = state => {
  return {
  	errors: state.users.create.syntaxErrors,
    creationErrorText: state.users.create.errorText,
    creationSuccessText: state.users.create.creationSuccessText,
    shouldResetForm: state.users.create.shouldResetForm,
    pending: state.users.create.pending
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
    setErrorText: (errors) => {dispatch(setCreateUserSyntaxError(errors))},
    clearErrorText: () => {dispatch(clearCreateUserSyntaxError())},
    createUser: (un, pw) => {dispatch(createUserAction(un, pw))},
    resetFormComplete: () => {dispatch(resetCreateFormComplete())},
  }
}

const CreateUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser)


export default CreateUserContainer;
