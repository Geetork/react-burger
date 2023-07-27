import { combineReducers } from 'redux';

import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { profileNavigationReducer } from './navigation';
import { resetPasswordReducer } from './reset-password';
import { authorizationReducer } from './authorization';

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    constructorIngredients: burgerConstructorReducer,
    navigation: profileNavigationReducer,
    resetPassword: resetPasswordReducer,
    authorization: authorizationReducer,
});