import * as router from '../../constants/routes.constants';

export const returnHome = () => {
	return (dispatch)=>{
		dispatch({type:router.HOME});
	}
};
