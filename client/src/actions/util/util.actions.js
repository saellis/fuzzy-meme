import * as _ from '../../constants/util/util.actions.constants';

import { replace } from 'react-router-redux';

export const returnHome = () => {
	return (dispatch)=>{
		dispatch(replace('/'));
	}
};
