import { connect } from 'react-redux'
import user from '../components/user';


const mapStateToProps = state => {
  return {
    id: state.users.userId
  }
}

const UserContainer = connect(
  mapStateToProps,
  null
)(user)


export default UserContainer;
