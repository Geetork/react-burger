import { register as registerAPI,
         login as loginAPI,
         getUserInfo as getUserInfoAPI,
         changeUserInfo as changeUserInfoAPI,
         refreshToken as refreshTokenAPI,
         logout as logoutAPI,
        } from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { SWITCH_HEADER_ITEM } from './navigation';
import { Middleware } from 'redux';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';

export const GET_CHANGE_USER_INFO_REQUEST = 'GET_CHANGE_USER_INFO_REQUEST';
export const CHANGE_USER_INFO_FAILED = 'CHANGE_USER_INFO_FAILED';
export const CHANGE_USER_INFO_SUCCESS = 'CHANGE_USER_INFO_SUCCESS';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';

export const SET_FORM_VALUE = 'SET_FORM_VALUE';

export function register(name: string, email: string, pass: string) {
    //@ts-ignore
    return function(dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        });

        registerAPI(name, email, pass)
        .then((res) => {
            localStorage.setItem('refreshToken', res.refreshToken);
            setCookie('token', res.accessToken);

            dispatch({
                type: REGISTER_SUCCESS,
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
    //@ts-ignore
    return function(dispatch) {
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
    //@ts-ignore
    return function(dispatch) {
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
    //@ts-ignore
    return function(dispatch) {
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
                //@ts-ignore
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
    //@ts-ignore
    return function(dispatch) {
        dispatch({
            type: GET_CHANGE_USER_INFO_REQUEST
        });

        changeUserInfoAPI(name, email, password)
        .then((res) => {
            dispatch({
                type: CHANGE_USER_INFO_SUCCESS,
            });
            
        })
        .catch((res) => {
            if (res.message === 'jwt expired') {
                //@ts-ignore
                dispatch(refreshToken(changeUserInfo(name, email, password)));
            } else {
                dispatch(getUserInfo());
            };
        });
    }
}

export function refreshToken(next: Middleware) {
    //@ts-ignore
    return function(dispatch) {
        refreshTokenAPI()
        .then(res => {
            dispatch(next);
        })
        .catch(res => {
            dispatch({ type: 'DEFAULT'})
        });
    }
}