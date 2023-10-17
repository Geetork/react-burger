import { IIngredient } from "../../utils/types";
import { GET_INGREDIENTS_REQUEST,
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILED,
         OPEN_INGREDIENT_MODAL,
         CLOSE_INGREDIENT_MODAL,
         RESET_INGREDIENTS_COUNTERS,
         TBurgerIngredientsActions,
         } from "../actions/burger-ingredients";

type TBurgerIngredientsState = {
    data: ReadonlyArray<IIngredient>,
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    currentModalIngredient: IIngredient | null
}

export const initialState: TBurgerIngredientsState = {
    data: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    currentModalIngredient: null,
}

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsActions) : TBurgerIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                data: action.data
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...initialState,
                ingredientsFailed: true
            };
        }
        case OPEN_INGREDIENT_MODAL: {
            return {
                ...state,
                currentModalIngredient: action.ingredient
            }
        }
        case CLOSE_INGREDIENT_MODAL: {
            return {
                ...state,
                currentModalIngredient: null
            }
        }
        case RESET_INGREDIENTS_COUNTERS: {
            const ingredients = state.data.map(ingredient => ({
                ...ingredient,
                count: 0
            }));
            return {
                ...state,
                data: ingredients
            }
        }
        default: {
            return state;
        }
    }
}