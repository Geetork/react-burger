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