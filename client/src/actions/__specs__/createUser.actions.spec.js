import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as _ from '../users.actions.js';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('users creation actions', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	it('creates CREATE_USER_PENDING, CREATE_USER_SUCCESS, and CLEAR_CREATE_USER_SYNTAX_ERROR when creating user has been done', () => {

		const response = {data: {}};

		fetchMock
      .postOnce('http://localhost:3001/users/create', response, {
	headers: {
		'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
	},
	body: 'username=jebediah&password=jones' });

		const expectedActions = [
      { type: _.CREATE_USER_PENDING},
      { type: _.CREATE_USER_SUCCESS, data: response},
      { type: _.CLEAR_CREATE_USER_SYNTAX_ERROR},

		];
		const store = mockStore({});

		return store.dispatch(_.createUserAction()).then(() => {
      // return of async actions
			expect(store.getActions()).to.deep.equal(expectedActions);
		});
	});

	it('creates CREATE_USER_PENDING and CREATE_USER_ERROR when failing to create user', () => {
    //will fail without passed response parameter
		fetchMock
      .postOnce('http://localhost:3001/users/create', {
	headers: {
		'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
	},
	body: 'username=jebediah&password=jones' });

		const expectedActions = [
      { type: _.CREATE_USER_PENDING},
      { type: _.CREATE_USER_ERROR},

		];
		const store = mockStore({});

		return store.dispatch(_.createUserAction()).then(() => {
      // return of async actions
			expect(store.getActions()).to.deep.equal(expectedActions);
		});
	});

	it('creates UPDATE_CREATE_USER_SYNTAX_ERROR when syntax error', () => {

		const text = 'hi stephen';

		const expectedActions = [
      { type: _.UPDATE_CREATE_USER_SYNTAX_ERROR, errors: [text]}
		];
		const store = mockStore({});

		store.dispatch(_.setCreateUserSyntaxError([text]));
		return expect(store.getActions()).to.deep.equal(expectedActions);
	});

	it('creates CLEAR_CREATE_USER_SYNTAX_ERROR action when clearing syntax error', () => {

		const expectedActions = [
      { type: _.CLEAR_CREATE_USER_SYNTAX_ERROR}
		];
		const store = mockStore({});
		store.dispatch(_.clearCreateUserSyntaxError());
		return expect(store.getActions()).to.deep.equal(expectedActions);
	});

	it('CLEAR_CREATE_USER', () => {
		const expectedActions = [
      {type: _.CLEAR_CREATE_USER}
		];
		const store = mockStore({});
		store.dispatch(_.clearCreateUser());
		return expect(store.getActions()).to.deep.equal(expectedActions);
	});

	it('CLEAR_LOGIN', () => {
		const expectedActions = [
			{type: _.CLEAR_LOGIN}
		];
		const store = mockStore({});
		store.dispatch(_.clearLogin());
		return expect(store.getActions()).to.deep.equal(expectedActions);
	});
});
