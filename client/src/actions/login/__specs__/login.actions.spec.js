import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../login.actions.js';
import * as _ from '../../../constants/login/login.actions.constants.js';

import * as router from '../../../constants/routes.constants';

import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('users login actions', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	it('creates LOGIN_PENDING, LOGIN_SUCCESS, and CLEAR_LOGIN_ERROR_TEXT, MENU when logging user in has been done', () => {

		const response = {_id:'asdfasd'};
		const un = 'jebediah';
		const pw = 'jones';

		fetchMock
      .postOnce('/users/auth', response, {
	headers: {
		'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
	},
	body: `username=${un}&password=${pw}` });

		const expectedActions = [
      { type: _.LOGIN_PENDING,},
      { type: _.LOGIN_SUCCESS, data: response},
      { type: _.CLEAR_LOGIN_ERROR_TEXT},
      { type: router.MENU},

		];
		const store = mockStore({});

		return store.dispatch(actions.loginAction(un, pw)).then(() => {
      // return of async actions
			expect(store.getActions()).to.deep.equal(expectedActions);
		});
	});

	it('creates LOGIN_PENDING and LOGIN_INCORRECT when logging user in has had incorrect credentials', () => {

		const response = {err:'login didnt work'};
		const un = 'jebediah';
		const pw = 'jones';

		fetchMock
      .postOnce('/users/auth', response, {
	headers: {
		'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
	},
	body: `username=${un}&password=${pw}` });

		const expectedActions = [
      { type: _.LOGIN_PENDING,},
      { type: _.LOGIN_INCORRECT, data: response},

		];
		const store = mockStore({});

		return store.dispatch(actions.loginAction(un, pw)).then(() => {
      // return of async actions
			expect(store.getActions()).to.deep.equal(expectedActions);
		});
	});

	it('creates LOGIN_PENDING and LOGIN_ERROR when error occurs to log in user', () => {
    //will fail without passed response parameter
		const un = 'jebediah';
		const pw = 'jones';

		fetchMock
      .postOnce('/users/auth', {
	headers: {
		'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
	},
	body: `username=${un}&password=${pw}` });

		const expectedActions = [
      { type: _.LOGIN_PENDING},
      { type: _.LOGIN_ERROR},

		];
		const store = mockStore({});

		return store.dispatch(actions.loginAction(un, pw)).then(() => {
      // return of async actions
			expect(store.getActions()).to.deep.equal(expectedActions);
		});
	});

	it('CLEAR_LOGIN', () => {
		const expectedActions = [
			{type: _.CLEAR_LOGIN}
		];
		const store = mockStore({});
		store.dispatch(actions.clearLogin());
		return expect(store.getActions()).to.deep.equal(expectedActions);
	});

});
