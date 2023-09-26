import { IWSOrders } from "../../utils/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export const WS_HISTORY_CONNECTION_START: 'WS_HISTORY_CONNECTION_START' = 'WS_HISTORY_CONNECTION_START';
export const WS_HISTORY_CONNECTION_SUCCESS: 'WS_HISTORY_CONNECTION_SUCCESS' = 'WS_HISTORY_CONNECTION_SUCCESS';
export const WS_HISTORY_CONNECTION_ERROR: 'WS_HISTORY_CONNECTION_ERROR' = 'WS_HISTORY_CONNECTION_ERROR';
export const WS_HISTORY_CONNECTION_CLOSED: 'WS_HISTORY_CONNECTION_CLOSED' = 'WS_HISTORY_CONNECTION_CLOSED';
export const WS_HISTORY_GET_MESSAGE: 'WS_HISTORY_GET_MESSAGE' = 'WS_HISTORY_GET_MESSAGE';
export const WS_HISTORY_SEND_MESSAGE: 'WS_HISTORY_SEND_MESSAGE' = 'WS_HISTORY_SEND_MESSAGE';

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
}

export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

type TWSOrdersPayload = Omit<IWSOrders, 'success'>;

export interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TWSOrdersPayload;
}

export interface IWSSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: any;
}

export type TWSActions = IWSConnectionStart |
    IWSConnectionSuccess |
    IWSConnectionError |
    IWSConnectionClosed |
    IWSGetMessage |
    IWSSendMessage;

export type TWSStoreActions = {
    wsInit: typeof WS_CONNECTION_START,
    wsSendMessage: typeof WS_SEND_MESSAGE,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE
};

export const wsActions: TWSStoreActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};


export interface IWSHistoryConnectionStart {
    readonly type: typeof WS_HISTORY_CONNECTION_START;
    readonly payload: string;
}

export interface IWSHistoryConnectionSuccess {
    readonly type: typeof WS_HISTORY_CONNECTION_SUCCESS;
}

export interface IWSHistoryConnectionError {
    readonly type: typeof WS_HISTORY_CONNECTION_ERROR;
}

export interface IWSHistoryConnectionClosed {
    readonly type: typeof WS_HISTORY_CONNECTION_CLOSED;
}

export interface IWSHistoryGetMessage {
    readonly type: typeof WS_HISTORY_GET_MESSAGE;
    readonly payload: TWSOrdersPayload;
}

export interface IWSHistorySendMessage {
    readonly type: typeof WS_HISTORY_SEND_MESSAGE;
    readonly payload: any;
}

export type TWSHistoryActions = IWSHistoryConnectionStart |
    IWSHistoryConnectionSuccess |
    IWSHistoryConnectionError |
    IWSHistoryConnectionClosed |
    IWSHistoryGetMessage |
    IWSHistorySendMessage;

export type TWSHistoryStoreActions = {
    wsInit: typeof WS_HISTORY_CONNECTION_START,
    wsSendMessage: typeof WS_HISTORY_SEND_MESSAGE,
    onOpen: typeof WS_HISTORY_CONNECTION_SUCCESS,
    onClose: typeof WS_HISTORY_CONNECTION_CLOSED,
    onError: typeof WS_HISTORY_CONNECTION_ERROR,
    onMessage: typeof WS_HISTORY_GET_MESSAGE
};

export const wsHistoryActions: TWSHistoryStoreActions = {
    wsInit: WS_HISTORY_CONNECTION_START,
    wsSendMessage: WS_HISTORY_SEND_MESSAGE,
    onOpen: WS_HISTORY_CONNECTION_SUCCESS,
    onClose: WS_HISTORY_CONNECTION_CLOSED,
    onError: WS_HISTORY_CONNECTION_ERROR,
    onMessage: WS_HISTORY_GET_MESSAGE
};

export type TWSAllStoreActions = {
    wsInit: typeof WS_HISTORY_CONNECTION_START | typeof WS_CONNECTION_START,
    wsSendMessage: typeof WS_HISTORY_SEND_MESSAGE | typeof WS_SEND_MESSAGE,
    onOpen: typeof WS_HISTORY_CONNECTION_SUCCESS | typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_HISTORY_CONNECTION_CLOSED | typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_HISTORY_CONNECTION_ERROR | typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_HISTORY_GET_MESSAGE | typeof WS_GET_MESSAGE
}

export type TWSAllActions = IWSHistoryConnectionStart |
    IWSHistoryConnectionSuccess |
    IWSHistoryConnectionError |
    IWSHistoryConnectionClosed |
    IWSHistoryGetMessage |
    IWSHistorySendMessage |
    IWSConnectionStart |
    IWSConnectionSuccess |
    IWSConnectionError |
    IWSConnectionClosed |
    IWSGetMessage |
    IWSSendMessage;