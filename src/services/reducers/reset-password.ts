import { GET_RESET_PASSWORD_EMAIL_REQUEST,
         GET_RESET_PASSWORD_EMAIL_FAILED,
         GET_RESET_PASSWORD_EMAIL_SUCCESS, 
         RESET_PASSWORD_EMAIL_REQUEST,
         RESET_PASSWORD_EMAIL_SUCCESS,
         RESET_PASSWORD_EMAIL_FAILED,
         SET_FORM_VALUE,
         SET_INITIAL_STATE,
         TResetPasswordActions
        } from "../actions/reset-password"

const initialState = {
    request: false,
    requestFailed: false,

    emailForgotPassword: '',
    gotEmail: false,

    isPasswordReset: false,
    passwordReset: '',
    emailCode: '',
}

export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions): typeof initialState => {
    switch(action.type) {
        case GET_RESET_PASSWORD_EMAIL_REQUEST:
        case RESET_PASSWORD_EMAIL_REQUEST: {
            return ({
                ...state,
                request: true
            })
        }
        case GET_RESET_PASSWORD_EMAIL_SUCCESS: {
            return ({
                ...state,
                request: false,
                gotEmail: true,
            })
        }
        case RESET_PASSWORD_EMAIL_SUCCESS: {
            return ({
                ...state,
                request: false,
                isPasswordReset: true,
            })
        }
        case GET_RESET_PASSWORD_EMAIL_FAILED:
        case RESET_PASSWORD_EMAIL_FAILED: {
            return ({
                ...state,
                request: false,
                requestFailed: true
            })
        }
        case SET_FORM_VALUE: {
            return ({
                ...state,
                [action.field]: action.value
            })
        }
        case SET_INITIAL_STATE: {
            return initialState
        }

        default: {
            return state;
        }
    }
}