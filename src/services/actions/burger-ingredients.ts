import { inherits } from "util";
import { getIngredients as getIngredientsAPI } from "../../utils/api";
import { IIngredient } from "../../utils/types";
import { GET_USER_INFO_FAILED } from "./authorization";
import { GET_CONSTRUCTOR_INGREDIENTS } from "./burger-сonstructor";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const OPEN_INGREDIENT_MODAL: 'OPEN_INGREDIENT_MODAL' = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_INGREDIENT_MODAL: 'CLOSE_INGREDIENT_MODAL' = 'CLOSE_INGREDIENT_MODAL';

export const RESET_INGREDIENTS_COUNTERS = 'RESET_INGREDIENTS_COUNTERS';

export interface IGetIngreduentsAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly data: ReadonlyArray<IIngredient>;
}

export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IOpenIngredientModal {
    readonly type: typeof OPEN_INGREDIENT_MODAL;
    readonly ingredient: IIngredient;
}

export interface ICloseIngredientModal {
    readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

export interface IResetIngredientsCounters {
    readonly type: typeof RESET_INGREDIENTS_COUNTERS;
}

export type TBurgerIngredientsActions = IGetIngreduentsAction |
    IGetIngredientsSuccess |
    IGetIngredientsFailed |
    IOpenIngredientModal |
    ICloseIngredientModal |
    IResetIngredientsCounters;

export function getIngredients(): any {
    return function(dispatch: any): any {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        getIngredientsAPI()
        .then(res => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                data: res.data
            });
            dispatch({
                type: GET_CONSTRUCTOR_INGREDIENTS
            });
        })
        .catch((e) => dispatch({
            type: GET_INGREDIENTS_FAILED
        }));
    }
};

export function decreaseCounter(data: IIngredient[], id: string) {
    const ingredient = data.find(item =>
        item._id === id);
    
    if (ingredient?.count) {
        const num = ingredient.type === 'bun' ? 2 : 1;

        ingredient['count'] -= num;
    }

    return function(dispatch: any): any {
        dispatch({ type: 'DEFAULT' });
    };
};

export function increaseCounter(data: IIngredient[], id: string) {
    const ingredient = data.find(item =>
        item._id === id    
    );
    
    if (ingredient) {
        const num = ingredient.type === 'bun' ? 2 : 1;

        !ingredient?.count ?
            ingredient['count'] = num :
            ingredient['count'] += num;
    }

    return function(dispatch: any): any {
        dispatch({ type: 'DEFAULT' });
    }
};