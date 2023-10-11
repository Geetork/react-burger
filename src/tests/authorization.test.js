import { authorizationReducer } from '../services/reducers/authorization';
import * as types from '../services/actions/authorization';

describe('Authorization reducer', () => {
  const initalState = {
    request: false,
    requestFailed: false,
  
    name: '',
    password: '',
    email: '',
    
    isAuthorized: false,
  };

  test('initial State', () => {
    expect(authorizationReducer(undefined, { type: undefined })).toEqual(initalState)
  })

  test('REGISTER_REQUEST', () => {
    const state = initalState;
    expect(authorizationReducer(state, { type: types.REGISTER_REQUEST })).toEqual({
      ...state,
      request: true,
    })
  })

  test('LOGIN_REQUEST', () => {
    const state = initalState;
    expect(authorizationReducer(state, { type: types.LOGIN_REQUEST })).toEqual({
      ...state,
      request: true,
    })
  })

  test('GET_USER_INFO_REQUEST', () => {
    const state = initalState;
    expect(authorizationReducer(state, { type: types.GET_USER_INFO_REQUEST })).toEqual({
      ...state,
      request: true,
    })
  })

  test('GET_CHANGE_USER_INFO_REQUEST', () => {
    const state = initalState;
    expect(authorizationReducer(state, { type: types.GET_CHANGE_USER_INFO_REQUEST })).toEqual({
      ...state,
      request: true,
    })
  })

  test('REGISTER_SUCCESS', () => {
    const state = initalState;
    expect(authorizationReducer(state, { 
      type: types.REGISTER_SUCCESS,
      isAuthorized: true
    })).toEqual({
      ...state,
      request: false,
      isAuthorized: true,
    })
  })

  test('LOGIN_SUCCESS', () => {
    const state = initalState;
    expect(authorizationReducer(state, { 
      type: types.LOGIN_SUCCESS,
      isAuthorized: true
    })).toEqual({
      ...state,
      request: false,
      isAuthorized: true,
    })
  })

  test('REGISTER_FAILED', () => {
    const state = initalState;
    expect(authorizationReducer(state, { type: types.REGISTER_FAILED })).toEqual({
      ...state,
      request: false,
      requestFailed: true,
    })
  })

  test('LOGIN_FAILED', () => {
    const state = initalState;
    expect(authorizationReducer(state, { type: types.LOGIN_FAILED })).toEqual({
      ...state,
      request: false,
      requestFailed: true,
    })
  })

  test('SET_FORM_VALUE', () => {
    const state = initalState;
    expect(authorizationReducer(state, {
      type: types.SET_FORM_VALUE,
      field: 'email',
      value: 'galinaleespb@gmail.com'
    })).toEqual({
      ...state,
      email: 'galinaleespb@gmail.com'
    })
  })

  test('GET_USER_INFO_SUCCESS', () => {
    const state = initalState;
    expect(authorizationReducer(state, {
      type: types.GET_USER_INFO_SUCCESS,
      name: 'galina',
      email: 'galinaleespb@gmail.com',
    })).toEqual({
      ...state,
      request: false,
      email: 'galinaleespb@gmail.com',
      name: 'galina',
      isAuthorized: true
    })
  })

  test('CHANGE_USER_INFO_SUCCESS', () => {
    const state = initalState;
    expect(authorizationReducer(state, {
      type: types.CHANGE_USER_INFO_SUCCESS,
      name: 'galina',
      email: 'galinaleespb@gmail.com',
    })).toEqual({
      ...state,
      request: false,
      email: 'galinaleespb@gmail.com',
      name: 'galina',
      isAuthorized: true
    })
  })

  test('LOGOUT_SUCCESS', () => {
    const state = initalState;
    expect(authorizationReducer(state, { type: types.LOGOUT_SUCCESS })).toEqual(initalState)
  })
});
