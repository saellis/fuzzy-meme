import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../createUser.actions.js';
import * as _ from '../../../constants/login/createUser.actions.constants.js';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('users creation actions', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	test('creates correct actions when creating user has been done', () => {

		const response = {data: {}};

		fetchMock
      .postOnce('/users/create', response, {
	headers: {
		'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
	},
	body: 'username=jebediah&password=jones' });

		const expectedActions = [
			{type:_.CREATE_USER_PENDING},
			{type:_.CLEAR_CREATE_USER_ERROR},
			{type:_.CLEAR_CREATE_USER_SUCCESS},
			{type:_.CREATE_USER_SUCCESS, data: response},
			{type:_.CLEAR_CREATE_USER_SYNTAX_ERROR}

		];
		const store = mockStore({});

		return store.dispatch(actions.createUserAction()).then(() => {
      // return of async actions
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	test(
        'creates CREATE_USER_PENDING and CREATE_USER_ERROR when failing to create user',
        async () => {
        //will fail without passed response parameter
            fetchMock
          .postOnce('/users/create', {throws: 'error'}, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: 'username=jebediah&password=jones' });

            const expectedActions = [
          { type: _.CREATE_USER_PENDING},
          { type: _.CLEAR_CREATE_USER_ERROR},
          { type: _.CLEAR_CREATE_USER_SUCCESS},
          { type: _.CREATE_USER_ERROR},

            ];
            const store = mockStore({});
						try{
							await store.dispatch(actions.createUserAction());
						}catch(err){}

						expect(store.getActions()).toEqual(expectedActions);
						return;
        }
    );

	test('creates UPDATE_CREATE_USER_SYNTAX_ERROR when syntax error', () => {

		const text = 'hi stephen';

		const expectedActions = [
      { type: _.UPDATE_CREATE_USER_SYNTAX_ERROR, errors: [text]}
		];
		const store = mockStore({});

		store.dispatch(actions.setCreateUserSyntaxError([text]));
		return expect(store.getActions()).toEqual(expectedActions);
	});

	test(
        'creates CLEAR_CREATE_USER_SYNTAX_ERROR action when clearing syntax error',
        () => {

            const expectedActions = [
          { type: _.CLEAR_CREATE_USER_SYNTAX_ERROR}
            ];
            const store = mockStore({});
            store.dispatch(actions.clearCreateUserSyntaxError());
            return expect(store.getActions()).toEqual(expectedActions);
        }
    );

	test('CLEAR_CREATE_USER', () => {
		const expectedActions = [
      {type: _.CLEAR_CREATE_USER}
		];
		const store = mockStore({});
		store.dispatch(actions.clearCreateUser());
		return expect(store.getActions()).toEqual(expectedActions);
	});
});
