const URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => res.ok ? res.json() : res.json()
    .then((err) => Promise.reject(err));

export function getIngredients() {
    return fetch(`${URL}/ingredients`)
        .then(checkResponse)
        .then(data => Promise.resolve(data.data));
}