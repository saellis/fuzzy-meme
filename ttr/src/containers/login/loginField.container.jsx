import { connect } from 'react-redux'
import user from '../../components/login/loginField.component.jsx';

import { updateFieldAction }  from '../../actions/users.actions';

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch =>{
  return {}
}

const LoginFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(user)


export default LoginFieldContainer;