import { getResetPasswordEmail as getResetPasswordEmailAPI,
         resetPassword as resetPasswordAPI } from "../../utils/api";

export const GET_RESET_PASSWORD_EMAIL_REQUEST: 'GET_RESET_PASSWORD_EMAIL_REQUEST' = 'GET_RESET_PASSWORD_EMAIL_REQUEST';
export const GET_RESET_PASSWORD_EMAIL_SUCCESS: 'GET_RESET_PASSWORD_EMAIL_SUCCESS' = 'GET_RESET_PASSWORD_EMAIL_SUCCESS';
export const GET_RESET_PASSWORD_EMAIL_FAILED: 'GET_RESET_PASSWORD_EMAIL_FAILED' = 'GET_RESET_PASSWORD_EMAIL_FAILED';

export const RESET_PASSWORD_EMAIL_REQUEST: 'RESET_PASSWORD_EMAIL_REQUEST' = 'RESET_PASSWORD_EMAIL_REQUEST';
export const RESET_PASSWORD_EMAIL_SUCCESS: 'RESET_PASSWORD_EMAIL_SUCCESS' = 'RESET_PASSWORD_EMAIL_SUCCESS';
export const RESET_PASSWORD_EMAIL_FAILED: 'RESET_PASSWORD_EMAIL_FAILED' = 'RESET_PASSWORD_EMAIL_FAILED';

export const SET_FORM_VALUE: 'SET_FORM_VALUE' = 'SET_FORM_VALUE';

export const SET_INITIAL_STATE: 'SET_INITIAL_STATE' = 'SET_INITIAL_STATE';

export interface IGetResetPasswordEmailRequest {
    readonly type: typeof GET_RESET_PASSWORD_EMAIL_REQUEST;
}

export interface IGetResetPasswordEmailSuccess {
    readonly type: typeof GET_RESET_PASSWORD_EMAIL_SUCCESS;
}

export interface IGetResetPasswordEmailFailed {
    readonly type: typeof GET_RESET_PASSWORD_EMAIL_FAILED;
}

export interface IResetPasswordEmailRequest {
    readonly type: typeof RESET_PASSWORD_EMAIL_REQUEST;
}

export interface IResetPasswordEmailSuccess {
    readonly type: typeof RESET_PASSWORD_EMAIL_SUCCESS;
}

export interface IResetPasswordEmailFailed {
    readonly type: typeof RESET_PASSWORD_EMAIL_FAILED;
}

export interface ISetFormValue {
    readonly type: typeof SET_FORM_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface ISetInitialState {
    readonly type: typeof SET_INITIAL_STATE;
}

export type TResetPasswordActions = IGetResetPasswordEmailRequest |
    IGetResetPasswordEmailSuccess |
    IGetResetPasswordEmailFailed |
    IResetPasswordEmailRequest |
    IResetPasswordEmailSuccess |
    IResetPasswordEmailFailed |
    ISetFormValue |
    ISetInitialState;

export function getResetPasswordEmail(email: string) {
    return function(dispatch: any): any {
        dispatch({
            type: GET_RESET_PASSWORD_EMAIL_REQUEST
        });

        getResetPasswordEmailAPI(email)
        .then(res => {
            dispatch({
                type: GET_RESET_PASSWORD_EMAIL_SUCCESS
            });
        })
        .catch((e) => dispatch({
            type: GET_RESET_PASSWORD_EMAIL_FAILED
        }));
    }
};

export function resetPassword(pass: string, token: string) {
    return function(dispatch: any): any {
        dispatch({
            type: RESET_PASSWORD_EMAIL_REQUEST
        })

        resetPasswordAPI(pass, token) 
        .then(res => {
            dispatch({
                type: RESET_PASSWORD_EMAIL_SUCCESS
            });
        })
        .catch((e) => dispatch({
            type: RESET_PASSWORD_EMAIL_FAILED
        }));
    }
}