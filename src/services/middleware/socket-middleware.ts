import type { Middleware, MiddlewareAPI } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

import { TWSAllActions, TWSAllStoreActions } from '../actions/web-socket';

import { store } from '../../index';
import { IWSOrders } from '../../utils/types';
import { getCookie } from '../../utils/cookie';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TWSAllActions>;

export const socketMiddleware = (wsUrl: string, wsActions: TWSAllStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSAllActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const token = getCookie('token')?.split(' ')[1];

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: IWSOrders = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          console.log(parsedData);
          success &&
            dispatch({ type: onMessage, payload: { ...restParsedData } });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const payload = action.payload;
          const message = { ...payload, token: token };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};