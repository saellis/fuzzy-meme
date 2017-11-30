import { connect } from 'react-redux'
import * as _ from '../../constants/routes.constants.js'

const initialState = {
	component: _.HOME
}

export const router = (state = initialState, action) => {
	if(action.type === 'MENU' || action.type === 'HOME'){
		return {...state, component: action.type};
	}else{
		return state;
	}
};
