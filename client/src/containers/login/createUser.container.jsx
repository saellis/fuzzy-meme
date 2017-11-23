import { connect } from 'react-redux'
import { CreateUser } from '../../components/login/createUser.component.jsx';

import { createUserAction, setCreateUserSyntaxError, clearCreateUserSyntaxError, setFieldData } from '../../actions/users.actions';


export const mapStateToProps = state => {
  return {
  	errors: state.users.createUserSyntaxErrors,
    fields: state.users.fields
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
    setErrorText: (errors) => {dispatch(setCreateUserSyntaxError(errors))},
    clearErrorText: () => {dispatch(clearCreateUserSyntaxError())},
    createUser: (un, pw) => {dispatch(createUserAction(un, pw))},
    setFieldData: (key, text) => {dispatch(setFieldData(key, text))}
  }
}

const CreateUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser)


export default CreateUserContainer;
