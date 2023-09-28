import { combineReducers } from 'redux';

import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { profileNavigationReducer } from './navigation';
import { resetPasswordReducer } from './reset-password';
import { authorizationReducer } from './authorization';
import { wsReducer, wsHistoryReducer } from './web-socket';

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    constructorIngredients: burgerConstructorReducer,
    navigation: profileNavigationReducer,
    resetPassword: resetPasswordReducer,
    authorization: authorizationReducer,
    websocket: wsReducer,
    websocketHistory: wsHistoryReducer,
});