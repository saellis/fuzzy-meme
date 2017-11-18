import { connect } from 'react-redux'
import user from '../../components/login/loginField.component';

import { updateFieldAction }  from '../../actions/users.actions';

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch =>{
  return { 
    saveText: (key, text) => {dispatch(updateFieldAction(key, text))}
  }
}

const LoginFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(user)


export default LoginFieldContainer;