import { Middleware } from 'redux';
import { register as registerAPI,
         login as loginAPI,
         getUserInfo as getUserInfoAPI,
         changeUserInfo as changeUserInfoAPI,
         refreshToken as refreshTokenAPI,
         logout as logoutAPI,
        } from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { SWITCH_HEADER_ITEM } from './navigation';
import { AppDispatch } from '../../utils/hooks';
import { ThunkAction } from 'redux-thunk';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';

export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';

export const GET_USER_INFO_REQUEST: 'GET_USER_INFO_REQUEST' = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_FAILED: 'GET_USER_INFO_FAILED' = 'GET_USER_INFO_FAILED';
export const GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS' = 'GET_USER_INFO_SUCCESS';

export const GET_CHANGE_USER_INFO_REQUEST: 'GET_CHANGE_USER_INFO_REQUEST' = 'GET_CHANGE_USER_INFO_REQUEST';
export const CHANGE_USER_INFO_FAILED: 'CHANGE_USER_INFO_FAILED' = 'CHANGE_USER_INFO_FAILED';
export const CHANGE_USER_INFO_SUCCESS: 'CHANGE_USER_INFO_SUCCESS' = 'CHANGE_USER_INFO_SUCCESS';

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';

export const SET_FORM_VALUE: 'SET_FORM_VALUE' = 'SET_FORM_VALUE';

export interface IRegisterAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccess {
    readonly type: typeof REGISTER_SUCCESS;
    readonly isAuthorized: boolean;
}

export interface IRegisterFailed {
    readonly type: typeof REGISTER_FAILED;
}

export interface ILoginAction {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS;
    readonly isAuthorized: boolean;
}

export interface ILoginFailed {
    readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface IGetUserInfoAction {
    readonly type: typeof GET_USER_INFO_REQUEST;
}

export interface IGetUserInfoFailed {
    readonly type: typeof GET_USER_INFO_FAILED;
}

export interface IGetChangeUserInfoRequest {
    readonly type: typeof GET_CHANGE_USER_INFO_REQUEST;
}

export interface IGetUserInfoSuccess {
    readonly type: typeof GET_USER_INFO_SUCCESS;
    readonly name: string;
    readonly email: string; 
}

export interface IGetChangeUserInfoAction {
    readonly type: typeof GET_CHANGE_USER_INFO_REQUEST;
    readonly name: string;
    readonly email: string; 
}

export interface IChangeUserInfoFailed {
    readonly type: typeof CHANGE_USER_INFO_FAILED;
}

export interface IChangeUserInfoSuccess {
    readonly type: typeof CHANGE_USER_INFO_SUCCESS;
    readonly name: string;
    readonly email: string; 
}

export interface IRefreshTokenAction {
    readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface ISetFormValueAction {
    readonly type: typeof SET_FORM_VALUE;
    readonly field: string;
    readonly value: string;
}

export type TAuthorization = IRegisterAction |
    IRegisterSuccess |
    IRegisterFailed |
    ILoginAction |
    ILoginSuccess |
    ILoginFailed |
    ILogoutSuccess |
    IGetUserInfoAction |
    IGetUserInfoFailed |
    IGetUserInfoSuccess |
    IGetChangeUserInfoRequest |
    IGetChangeUserInfoAction |
    IChangeUserInfoFailed |
    IChangeUserInfoSuccess |
    IRefreshTokenAction |
    ISetFormValueAction;

export function register(name: string, email: string, pass: string) {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: REGISTER_REQUEST
        });

        registerAPI(name, email, pass)
        .then((res) => {
            localStorage.setItem('refreshToken', res.refreshToken);
            setCookie('token', res.accessToken);

            dispatch({
                type: REGISTER_SUCCESS,
                isAuthorized: true
            });
        })
        .catch((e) => {
            dispatch({
                type: REGISTER_FAILED
            });
        });
    }
}

export function login(email: string, pass: string) {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });

        loginAPI(email, pass)
        .then((res) => {
            localStorage.setItem('refreshToken', res.refreshToken);
            setCookie('token', res.accessToken);
            dispatch({
                type: LOGIN_SUCCESS,
                isAuthorized: true
            });
        })
        .catch((e) => {
            dispatch({
                type: LOGIN_FAILED
            });
        });
    }
}

export function logout() {
    return function(dispatch: AppDispatch) {
        logoutAPI()
        .then(res => {
            deleteCookie('token');

            dispatch({ type: LOGOUT_SUCCESS });
            dispatch({ 
                type: SWITCH_HEADER_ITEM,
                current: 'constructor'
            });
        })
        .catch(res => {
            console.log(res);
        })
    }
}

export function getUserInfo() {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_USER_INFO_REQUEST
        });

        getUserInfoAPI()
        .then((res) => {
            dispatch({
                type: GET_USER_INFO_SUCCESS,
                email: res.user.email,
                name: res.user.name
            });
        })
        .catch((res) => {
            if (res.message === 'jwt expired') {
                dispatch(refreshToken(getUserInfo()));
            } else {
                dispatch({
                    type: GET_USER_INFO_FAILED
                });
            }
        });
    }
}

export function changeUserInfo(name: string, email: string, password: string) {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_CHANGE_USER_INFO_REQUEST,
            name: name,
            email: email,
        });

        changeUserInfoAPI(name, email, password)
        .then((res) => {
            dispatch({
                type: CHANGE_USER_INFO_SUCCESS,
                name: name,
                email: email,
            });
            
        })
        .catch((res) => {
            if (res.message === 'jwt expired') {
                dispatch(refreshToken(changeUserInfo(name, email, password)));
            } else {
                dispatch(getUserInfo());
            };
        });
    }
}

export function refreshToken(next?: (dispatch: AppDispatch) => void) {
    return function(dispatch: AppDispatch) {
        refreshTokenAPI()
        .then(res => {
            next && dispatch(next);
        })
        .catch(res => {
            dispatch({ type: 'DEFAULT'})
        });
    }
}