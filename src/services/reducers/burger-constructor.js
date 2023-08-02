import {
        GET_CONSTRUCTOR_INGREDIENTS,
        POST_ORDER_REQUEST,
        POST_ORDER_FAILED,
        POST_ORDER_SUCCESS,
        ADD_INGREDIENT,
        ADD_BUN,
        REMOVE_INGREDIENT,
        MOVE_INGREDIENT,
        CLEAR_CONSTRUCTOR
       } from '../actions/burger-сonstructor';

const initialState = {
    bun: {},
    constructorIngredients: [],

    orderRequest: false,
    orderFailed: false,
    order: '',

    isLoading: false,
}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CONSTRUCTOR_INGREDIENTS: {
            return state;
        }
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                isLoading: true,
            };
        }
        case POST_ORDER_FAILED: {
            return {
                ...initialState,
                orderFailed: true,
                isLoading: false,
            }
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                order: action.order,
                isLoading: false,
            }
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: [
                    ...state.constructorIngredients,
                    {
                        id: action.id,
                        ...action.ingredient
                    }
                ]
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: {
                    idTop: action.idTop,
                    idBottom: action.idBottom,
                    ...action.ingredient
                }
            }
        }
        case REMOVE_INGREDIENT: {
            const hasBun = Object.keys(state.bun).length !== 0;
            const ingredients = [...state.constructorIngredients];
            ingredients.splice(hasBun ? action.id - 1: action.id, 1);
            return {
                ...state,
                constructorIngredients: ingredients
            }
        }
        case MOVE_INGREDIENT: {
            const hasBun = Object.keys(state.bun).length !== 0;

            const ingredients = [...state.constructorIngredients];
            ingredients.splice(hasBun ? action.currentId - 1 : action.currentId, 0 , 
                ingredients.splice(hasBun ? action.prevId - 1 : action.prevId, 1)[0])
            return {
                ...state,
                constructorIngredients: ingredients
            }
        }
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                bun: {},
                constructorIngredients: []
            };
        }
        default: {
            return state;
        }
    }
}