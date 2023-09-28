import { IIngredient, IBun, IDroppedIngredient } from '../../utils/types';
import {
        GET_CONSTRUCTOR_INGREDIENTS,
        POST_ORDER_REQUEST,
        POST_ORDER_FAILED,
        POST_ORDER_SUCCESS,
        ADD_INGREDIENT,
        ADD_BUN,
        REMOVE_INGREDIENT,
        MOVE_INGREDIENT,
        CLEAR_CONSTRUCTOR,
        TBurgerConstructorActions
       } from '../actions/burger-сonstructor';

type TBurgerConstructor = {
    bun: IBun | null,
    constructorIngredients: IDroppedIngredient[],
    orderRequest: boolean,
    orderFailed: boolean,
    order: string,
    isLoading: boolean,
}

const initialState: TBurgerConstructor = {
    bun: null,
    constructorIngredients: [],

    orderRequest: false,
    orderFailed: false,
    order: '',

    isLoading: false,
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions) : TBurgerConstructor => {
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
                order: action.order.toString(),
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
            const ingredients = [...state.constructorIngredients];
            ingredients.splice(state.bun ? action.id - 1: action.id, 1);
            return {
                ...state,
                constructorIngredients: ingredients
            }
        }
        case MOVE_INGREDIENT: {
            const ingredients = [...state.constructorIngredients];
            ingredients.splice(state.bun ? action.currentId - 1 : action.currentId, 0 , 
                ingredients.splice(state.bun ? action.prevId - 1 : action.prevId, 1)[0])
            return {
                ...state,
                constructorIngredients: ingredients
            }
        }
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                bun: null,
                constructorIngredients: []
            };
        }
        default: {
            return state;
        }
    }
}