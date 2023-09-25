import { REGISTER_REQUEST,
         REGISTER_FAILED,
         REGISTER_SUCCESS,
         LOGIN_REQUEST,
         LOGIN_FAILED,
         LOGIN_SUCCESS,
         SET_FORM_VALUE,
         GET_USER_INFO_REQUEST,
         GET_USER_INFO_SUCCESS,
         GET_CHANGE_USER_INFO_REQUEST,
         CHANGE_USER_INFO_SUCCESS,
         LOGOUT_SUCCESS,
         TAuthorization,
         } from "../actions/authorization";

const initialState = {
    request: false,
    requestFailed: false,

    name: '',
    password: '',
    email: '',
    
    isAuthorized: false,
}

export const authorizationReducer = (state = initialState, action: TAuthorization) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_INFO_REQUEST:
        case GET_CHANGE_USER_INFO_REQUEST: {
            return ({
                ...state,
                request: true
            })
        }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS: {
            return {
                ...state,
                request: false,
                isAuthorized: action.isAuthorized,
            }
        }
        case REGISTER_FAILED:
        case LOGIN_FAILED: {
            return ({
                ...state,
                requestFailed: true,
                request: false,
            })
        }
        case SET_FORM_VALUE: {
            return ({
                ...state,
                [action.field]: action.value
            })
        }
        case GET_USER_INFO_SUCCESS:
        case CHANGE_USER_INFO_SUCCESS: {
            return ({
                ...state,
                request: false,
                email: action.email,
                name: action.name,
                isAuthorized: true
            })
        }
        case LOGOUT_SUCCESS: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}