import { connect } from 'react-redux'
import { Routes } from './routes.component.jsx';

export const mapStateToProps = state => {
  return {
    component : state.routes.component
  }
}

export const mapDispatchToProps = dispatch =>{
  return {
  }
}

const RoutesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);


export default RoutesContainer;
