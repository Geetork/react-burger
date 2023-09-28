import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RootState } from "./types";
import { TAuthorization } from "../services/actions/authorization";
import { TBurgerConstructorActions } from "../services/actions/burger-сonstructor";
import { TBurgerIngredientsActions } from "../services/actions/burger-ingredients";
import { TNavigationActions } from "../services/actions/navigation";
import { TResetPasswordActions } from "../services/actions/reset-password";
import { TWSActions, TWSAllActions } from "../services/actions/web-socket";

type AppActions = TAuthorization |
    TBurgerConstructorActions |
    TBurgerIngredientsActions |
    TNavigationActions |
    TResetPasswordActions |
    TWSAllActions;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;