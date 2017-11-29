import { connect } from 'react-redux'
import { routes } from '../../constants/routes.constants.js'

const initialState = {
	component: routes['HOME'].component
}

export const router = (state = initialState, action) => {
	if(action.type === 'MENU'){
		let newComponent = routes[action.type].component;
		return {...state, component: newComponent};
	}else{
		return state;
	}
};
