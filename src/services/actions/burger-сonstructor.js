import { makeOrder as makeOrderAPI } from "../../utils/api";

export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED'; 
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';

export function makeOrder(ingredients) {
    return function(dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        });

        makeOrderAPI(ingredients)
        .then(res => dispatch({
            type: POST_ORDER_SUCCESS,
            order: res
        }))
        .catch((e) => {
            dispatch({
                type: POST_ORDER_FAILED
            })
        })
    }
};