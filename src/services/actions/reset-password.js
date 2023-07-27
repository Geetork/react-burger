import { getResetPasswordEmail as getResetPasswordEmailAPI,
         resetPassword as resetPasswordAPI } from "../../utils/api";

export const GET_RESET_PASSWORD_EMAIL_REQUEST = 'GET_RESET_PASSWORD_EMAIL_REQUEST';
export const GET_RESET_PASSWORD_EMAIL_SUCCESSS = 'GET_RESET_PASSWORD_EMAIL_SUCCESSS';
export const GET_RESET_PASSWORD_EMAIL_FAILED = 'GET_RESET_PASSWORD_EMAIL_FAILED';

export const RESET_PASSWORD_EMAIL_REQUEST = 'RESET_PASSWORD_EMAIL_REQUEST';
export const RESET_PASSWORD_EMAIL_SUCCESSS = 'RESET_PASSWORD_EMAIL_SUCCESSS';
export const RESET_PASSWORD_EMAIL_FAILED = 'RESET_PASSWORD_EMAIL_FAILED';

export const SET_FORM_VALUE = 'SET_FORGOT_PASSWORD_VALUE_FORM';

export function getResetPasswordEmail(email) {
    return function(dispatch) {
        dispatch({
            type: GET_RESET_PASSWORD_EMAIL_REQUEST
        });

        getResetPasswordEmailAPI(email)
        .then(res => {
            dispatch({
                type: GET_RESET_PASSWORD_EMAIL_SUCCESSS
            });
        })
        .catch((e) => dispatch({
            type: GET_RESET_PASSWORD_EMAIL_FAILED
        }));
    }
};

export function resetPassword(pass, token) {
    return function(dispatch) {
        dispatch({
            type: RESET_PASSWORD_EMAIL_REQUEST
        })

        resetPasswordAPI(pass, token) 
        .then(res => {
            dispatch({
                type: RESET_PASSWORD_EMAIL_SUCCESSS
            });
        })
        .catch((e) => dispatch({
            type: RESET_PASSWORD_EMAIL_FAILED
        }));
    }
}