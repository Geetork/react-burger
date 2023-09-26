import { IWSOrder } from "../../utils/types";

import { TWSActions, TWSHistoryActions } from "../actions/web-socket";

import { WS_CONNECTION_START,
         WS_CONNECTION_SUCCESS,
         WS_CONNECTION_ERROR,
         WS_CONNECTION_CLOSED,
         WS_GET_MESSAGE,
         WS_HISTORY_CONNECTION_START,
         WS_HISTORY_CONNECTION_SUCCESS,
         WS_HISTORY_CONNECTION_ERROR,
         WS_HISTORY_CONNECTION_CLOSED,
         WS_HISTORY_GET_MESSAGE,
         WS_HISTORY_SEND_MESSAGE} from "../actions/web-socket";        


type TWSState = {
    wsConnected: boolean,
    orders: ReadonlyArray<IWSOrder>,
    total: number,
    totalToday: number,
    error: boolean,
};

const initialState: TWSState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,

    error: false,
}

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          error: false,
          wsConnected: true,
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          error: true,
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          error: false,
          wsConnected: false
        };
  
      case WS_GET_MESSAGE:
        return {
          ...state,
          orders: [ ...action.payload?.orders ],
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        };
  
      default:
        return state;
    }
  };

  export const wsHistoryReducer = (state = initialState, action: TWSHistoryActions) => {
    switch (action.type) {
      case WS_HISTORY_CONNECTION_SUCCESS:
        return {
          ...state,
          error: undefined,
          wsConnected: true,
        };
  
      case WS_HISTORY_CONNECTION_ERROR:
        return {
          ...state,
          error: true,
          wsConnected: false
        };
  
      case WS_HISTORY_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnected: false
        };
  
      case WS_HISTORY_GET_MESSAGE:
        return {
          ...state,
          error: undefined,
          orders: [ ...action.payload?.orders ],
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        };
  
      default:
        return state;
    }
  };