import { getCookie } from "./cookie";
import { TRefreshResponse,
         TAuth,
         TLogout,
         TResetPassword,
         TOrderResponse,
         TUserInfo,
         IDroppedIngredient,         
} from './types';

const URL = 'https://norma.nomoreparties.space/api';

const checkResponse = <T>(res: Response): Promise<T> => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};
  
const checkSuccess = <T>(res: any) => {
    if (res?.success) {
        return res;
    }

    return Promise.reject(`Ответ не success: ${res}`);
};
  
const request = <T>(endpoint: RequestInfo, options?: RequestInit) => {
    return fetch(`${URL}${endpoint}`, options)
        .then(res => checkResponse<T>(res))
        .then(res => checkSuccess<T>(res));
};

export const getIngredients = () => request(`/ingredients`);

export const makeOrder = (data: string[]) => request<TOrderResponse>(`/orders`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('token')
    } as HeadersInit,
    body: JSON.stringify({
        ingredients: data,
    }),
});

export const getResetPasswordEmail = (email: string) => request<TResetPassword>(`/password-reset`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
        email: email
    })
})

export const resetPassword = (pass: string, token: string) => request<TResetPassword>(`/password-reset/reset`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
        password: pass,
        token: token
    })
})

export const register = (name: string, email: string, pass: string) => request<TAuth>(`/auth/register`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
        email: email,
        password: pass,
        name: name
    })
})

export const login = (email: string, pass: string) => request<TAuth>(`/auth/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
        email: email,
        password: pass
    })
})

export const logout = () => request<TLogout>(`/auth/logout`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
    })
})

export const getUserInfo = () => request<TUserInfo>(`/auth/user`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('token')
    } as HeadersInit
})

export const changeUserInfo = (name: string, email: string, pass: string) => request<TUserInfo>(`/auth/user`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('token')
    } as HeadersInit,
    body: JSON.stringify({
        name: name,
        email: email,
        password: pass
    })
})

export const refreshToken = () => request<TRefreshResponse>(`/auth/token`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        token: localStorage.getItem('refreshToken')})
})