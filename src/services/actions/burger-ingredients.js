import { getIngredients as getIngredientsAPI } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIETNS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_INGREDIENT_MODAL = 'CLOSE_INGREDIENT_MODAL';

export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        getIngredientsAPI()
        .then(res => dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            data: res
        }))
        .catch((e) => dispatch({
            type: GET_INGREDIENTS_FAILED
        }));
    }
};

export function decreaseCounter(data, id) {
    const ingredient = data.find(item =>
        item._id === id);
    
    const num = ingredient.type === 'bun' ? 2 : 1;

    ingredient['count'] -= num;

    return function(dispatch) {
        dispatch({
            type: DECREASE_COUNTER          
        })
    }
};

export function increaseCounter(data, id) {
    const ingredient = data.find(item =>
        item._id === id    
    );
    
    const num = ingredient.type === 'bun' ? 2 : 1;

    (ingredient && !ingredient?.count) ?
        ingredient['count'] = num :
        ingredient['count'] += num;

    return function(dispatch) {
        dispatch({
            type: INCREASE_COUNTER          
        })
    }
};