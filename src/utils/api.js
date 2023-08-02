import { getCookie } from "./cookie";

const URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  };
  
const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }

    return Promise.reject(`Ответ не success: ${res}`);
};
  
const request = (endpoint, options) => {
    return fetch(`${URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

export const getIngredients = () => request(`/ingredients`);

export const makeOrder = (data) => request(`/orders`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
        ingredients: data,
    }),
});

export const getResetPasswordEmail = (email) => request(`/password-reset`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
        email: email
    })
})

export const resetPassword = (pass, token) => request(`/password-reset/reset`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
        password: pass,
        token: token
    })
})

export const register = (name, email, pass) => request(`/auth/register`, {
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

export const login = (email, pass) => request(`/auth/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
        email: email,
        password: pass
    })
})

export const logout = () => request(`/auth/logout`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
    })
})

export const getUserInfo = () => request(`/auth/user`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('token')
    }
})

export const changeUserInfo = (name, email, pass) => request(`/auth/user`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('token')
    },
    body: JSON.stringify({
        name: name,
        email: email,
        password: pass
    })
})

export const refreshToken = () => request(`/auth/token`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        token: localStorage.getItem('refreshToken')})
})