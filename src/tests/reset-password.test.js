import { resetPasswordReducer } from '../services/reducers/reset-password';
import * as types from '../services/actions/reset-password';
import { initialState } from '../services/reducers/reset-password';

describe('Reset Password reducer', () => {
    const initialState = {
        request: false,
        requestFailed: false,

        emailForgotPassword: '',
        gotEmail: false,

        isPasswordReset: false,
        passwordReset: '',
        emailCode: '',
    };

    test('initial State', () => {
        expect(resetPasswordReducer(undefined, { type: undefined })).toEqual(initialState)
    })

    test('GET_RESET_PASSWORD_EMAIL_REQUEST', () => {
        const state = initialState;
        expect(resetPasswordReducer(state, { type: types.GET_RESET_PASSWORD_EMAIL_REQUEST })).toEqual({
            ...state,
            request: true
        })
    })

    test('GET_RESET_PASSWORD_EMAIL_SUCCESS', () => {
        const state = initialState;
        expect(resetPasswordReducer(state, { type: types.GET_RESET_PASSWORD_EMAIL_SUCCESS })).toEqual({
            ...state,
            request: false,
            gotEmail: true,
        })
    })

    test('RESET_PASSWORD_EMAIL_SUCCESS', () => {
        const state = initialState;
        expect(resetPasswordReducer(state, { type: types.RESET_PASSWORD_EMAIL_SUCCESS })).toEqual({
            ...state,
            request: false,
            isPasswordReset: true,
        })
    })

    test('GET_RESET_PASSWORD_EMAIL_FAILED', () => {
        const state = initialState;
        expect(resetPasswordReducer(state, { type: types.GET_RESET_PASSWORD_EMAIL_FAILED })).toEqual({
            ...state,
            request: false,
            requestFailed: true
        })
    })

    test('RESET_PASSWORD_EMAIL_FAILED', () => {
        const state = initialState;
        expect(resetPasswordReducer(state, { type: types.RESET_PASSWORD_EMAIL_FAILED })).toEqual({
            ...state,
            request: false,
            requestFailed: true
        })
    })

    test('SET_INITIAL_STATE', () => {
        const state = initialState;
        expect(resetPasswordReducer(state, { type: types.SET_INITIAL_STATE })).toEqual(initialState)
    })
})