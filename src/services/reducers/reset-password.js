import { GET_RESET_PASSWORD_EMAIL_REQUEST,
         GET_RESET_PASSWORD_EMAIL_FAILED,
         GET_RESET_PASSWORD_EMAIL_SUCCESSS, 
         RESET_PASSWORD_EMAIL_REQUEST,
         RESET_PASSWORD_EMAIL_SUCCESSS,
         RESET_PASSWORD_EMAIL_FAILED,
         SET_FORM_VALUE} from "../actions/reset-password"

const initialState = {
    request: true,
    requestFailed: false,

    emailForgotPassword: '',
    passwordReset: '',
    emailCode: '',
}

export const resetPasswordReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_RESET_PASSWORD_EMAIL_REQUEST:
        case RESET_PASSWORD_EMAIL_REQUEST: {
            return ({
                ...state,
                request: true
            })
        }
        case GET_RESET_PASSWORD_EMAIL_SUCCESSS:
        case RESET_PASSWORD_EMAIL_SUCCESSS: {
            return ({
                ...state,
                request: false
            })
        }
        case GET_RESET_PASSWORD_EMAIL_FAILED:
        case RESET_PASSWORD_EMAIL_FAILED: {
            return ({
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

        default: {
            return state;
        }
    }
}