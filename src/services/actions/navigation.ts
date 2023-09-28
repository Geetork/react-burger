import { ThunkDispatch } from 'redux-thunk';
import { RootState } from "../../utils/types";
import { TAuthorization } from './authorization';

export const SWITCH_PROFILE_NAVIGATION_ITEM: 'SWITCH_PROFILE_NAVIGATION_ITEM' = 'SWITCH_PROFILE_NAVIGATION_ITEM';
export const SWITCH_HEADER_ITEM: 'SWITCH_HEADER_ITEM' = 'SWITCH_HEADER_ITEM';
export const SET_NAVIGATION_INITIAL_STATE: 'SET_NAVIGATION_INITIAL_STATE' = 'SET_NAVIGATION_INITIAL_STATE';

export interface ISwitchProfileNavitionItem {
    readonly type: typeof SWITCH_PROFILE_NAVIGATION_ITEM;
    readonly current: string;
}

export interface ISwitchHeaderItem {
    readonly type: typeof SWITCH_HEADER_ITEM;
    readonly current: string;
}

export interface ISetNavigationInitialState {
    readonly type: typeof SET_NAVIGATION_INITIAL_STATE;
}

export type TNavigationActions = ISwitchProfileNavitionItem |
    ISwitchHeaderItem |
    ISetNavigationInitialState;

export type AppDispatch = ThunkDispatch<RootState, unknown, TNavigationActions | TAuthorization>;