import { makeOrder as makeOrderAPI } from "../../utils/api";
import { IDroppedIngredient, IIngredient } from "../../utils/types";
import { RESET_INGREDIENTS_COUNTERS } from "./burger-ingredients";
import { WS_HISTORY_CONNECTION_START, WS_HISTORY_SEND_MESSAGE } from "./web-socket";

export const GET_CONSTRUCTOR_INGREDIENTS: 'GET_CONSTRUCTOR_INGREDIENTS' = 'GET_CONSTRUCTOR_INGREDIENTS';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED'; 
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';

export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

export interface IGetConstructorIngredients {
    readonly type: typeof GET_CONSTRUCTOR_INGREDIENTS;
}

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly id: string;
    readonly ingredient: IIngredient;
}

export interface IAddBun {
    readonly type: typeof ADD_BUN;
    readonly idTop: string;
    readonly idBottom: string;
    readonly ingredient: IIngredient;
}

export interface IRemoveIngredient {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly id: number;
}

export interface IMoveIngredient {
    readonly type: typeof MOVE_INGREDIENT;
    readonly prevId: number;
    readonly currentId: number;
}

export interface IPostOrderRequest {
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderFailed {
    readonly type: typeof POST_ORDER_FAILED;
}

export interface IPostOrderSucess {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly order: number;
}

export interface IClearConstructor {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructorActions = IGetConstructorIngredients |
    IAddIngredient |
    IAddBun |
    IRemoveIngredient |
    IMoveIngredient |
    IPostOrderRequest |
    IPostOrderFailed |
    IPostOrderSucess |
    IClearConstructor;

export function makeOrder(ingredients: IDroppedIngredient[]) {
    return function(dispatch: any): any {
        dispatch({
            type: POST_ORDER_REQUEST
        });

        makeOrderAPI(ingredients as IDroppedIngredient[])
        .then(res => {
            
            dispatch({
                type: POST_ORDER_SUCCESS,
                order: res.order.number
            });
            dispatch({ type: CLEAR_CONSTRUCTOR });
            dispatch({ type: RESET_INGREDIENTS_COUNTERS });
        })
        .catch((e) => {
            dispatch({
                type: POST_ORDER_FAILED
            })
        })
    }
};