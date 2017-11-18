import { connect } from 'react-redux'
import user from '../components/user.component';

import { createUserAction }  from '../actions/users.actions';

const mapStateToProps = state => {
  return {
    id: state.users.userId
  }
}

const mapDispatchToProps = dispatch =>{
  return { 
    create: () => {dispatch(createUserAction())}
  }
}

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(user)


export default UserContainer;
