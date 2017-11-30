import * as _ from '../../constants/util/util.actions.constants';
import * as router from '../../constants/routes.constants';

export const returnHome = () => {
	return (dispatch)=>{
		dispatch({type:router.HOME});
	}
};
