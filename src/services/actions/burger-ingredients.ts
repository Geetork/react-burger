import { getIngredients as getIngredientsAPI } from "../../utils/api";
import { IIngredient } from "../../utils/types";
import { GET_CONSTRUCTOR_INGREDIENTS } from "./burger-сonstructor";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIETNS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_INGREDIENT_MODAL = 'CLOSE_INGREDIENT_MODAL';

export const RESET_INGREDIENTS_COUNTERS = 'RESET_INGREDIENTS_COUNTERS';

export function getIngredients() {
    //@ts-ignore
    return function(dispatch) {
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

    //@ts-ignore
    return function(dispatch){
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

    //@ts-ignore
    return function(dispatch){
        dispatch({ type: 'DEFAULT' });
    }
};