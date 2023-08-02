import { GET_INGREDIENTS_REQUEST,
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILED,
         OPEN_INGREDIENT_MODAL,
         CLOSE_INGREDIENT_MODAL,
         } from "../actions/burger-ingredients";

const initialState = {
    data: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    currentModalIngredient: {},
}

export const burgerIngredientsReducer = (state = initialState, action) => {
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
                currentModalIngredient: {}
            }
        }
        default: {
            return state;
        }
    }
}