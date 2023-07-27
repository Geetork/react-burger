import { getCookie } from "./cookie";

const URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => res.ok ? res.json() : res.json()
    .then((err) => Promise.reject(err));

export function getIngredients() {
    return fetch(`${URL}/ingredients`)
        .then(checkResponse)
        .then((res) => {
            if (res?.success) return res.data;
            return Promise.reject(res);    
        });
}

export function makeOrder(data) {
    return fetch(`${URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            ingredients: data,
        }),
    })
        .then(checkResponse)
        .then((res) => {
            if (res?.success) return res.order.number;
            return Promise.reject(res);    
        });
}

export function getResetPasswordEmail(email) {
    return fetch(`${URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            email: email
        })
    })
        .then(checkResponse)
        .then((res) => {
            if (res?.success) return res;
            return Promise.reject(res);    
        });
}

export function resetPassword(pass, token) {
    return fetch(`${URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            password: pass,
            token: token
        })
    })
        .then(checkResponse)
        .then((res) => {
            if (res?.success) return res;
            return Promise.reject(res);    
        });
}

export function register(name, email, pass) {
    return fetch(`${URL}/auth/register`, {
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
        .then(checkResponse)
        .then((res) => {
            if (res?.success) return res;
            return Promise.reject(res);    
        });
}

export function login(email, pass) {
    return fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            email: email,
            password: pass
        })
    })
        .then(checkResponse)
        .then((res) => {
            if (res?.success) return res;
            return Promise.reject(res);    
        });
}

export function logout() {
    return fetch(`${URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
        .then(checkResponse)
        .then((res) => {
            if (res?.success) return res;
            return Promise.reject(res);    
        });
}

export function getUserInfo() {
    return fetch(`${URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            authorization: getCookie('token')
        }
    })
        .then(checkResponse)
        .then((res) => {
            if (res?.success) return res;
            return Promise.reject(res);    
        });
}

export function changeUserInfo(name, email, pass) {
    return fetch(`${URL}/auth/user`, {
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
        .then(checkResponse)
        .then((res) => {
            if (res?.success) return res;
            return Promise.reject(res);    
        });
}

export function refreshToken() {
    return fetch(`${URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')})
    })
        .then(checkResponse)
        .then((res) => {
            if (res?.success) return res;
            return Promise.reject(res);    
        });
}