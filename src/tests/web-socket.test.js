import { wsReducer, wsHistoryReducer } from '../services/reducers/web-socket';
import * as types from '../services/actions/web-socket';

describe('Web Socket reducer', () => {
    const initalState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,

        error: false,
    };

    test('initial State', () => {
        expect(wsReducer(undefined, { type: undefined })).toEqual(initalState)
    })

    test('WS_CONNECTION_SUCCESS', () => {
        const state = initalState;
        expect(wsReducer(state, { type: types.WS_CONNECTION_SUCCESS })).toEqual({
            ...state,
            error: false,
            wsConnected: true,
        })
    })

    test('WS_HISTORY_CONNECTION_SUCCESS', () => {
        const state = initalState;
        expect(wsHistoryReducer(state, { type: types.WS_HISTORY_CONNECTION_SUCCESS })).toEqual({
            ...state,
            error: undefined,
            wsConnected: true,
        })
    })

    test('WS_CONNECTION_ERROR', () => {
        const state = initalState;
        expect(wsReducer(state, { type: types.WS_CONNECTION_ERROR })).toEqual({
            ...state,
            error: true,
            wsConnected: false
        })
    })

    test('WS_HISTORY_CONNECTION_ERROR', () => {
        const state = initalState;
        expect(wsHistoryReducer(state, { type: types.WS_HISTORY_CONNECTION_ERROR })).toEqual({
            ...state,
            error: true,
            wsConnected: false
        })
    })

    test('WS_CONNECTION_CLOSED', () => {
        const state = initalState;
        expect(wsReducer(state, { type: types.WS_CONNECTION_CLOSED })).toEqual({
            ...state,
            error: false,
            wsConnected: false
        })
    })

    test('WS_HISTORY_CONNECTION_CLOSED', () => {
        const state = initalState;
        expect(wsHistoryReducer(state, { type: types.WS_HISTORY_CONNECTION_CLOSED })).toEqual({
            ...state,
            error: undefined,
            wsConnected: false
        })
    })

    test('WS_GET_MESSAGE', () => {
        const state = initalState;
        expect(wsReducer(state, { type: types.WS_GET_MESSAGE,
            payload: {
                orders: [
                    {
                      _id: '6526ce936d2997001cab1c77',
                      ingredients: [
                        '643d69a5c3f7b9001cfa093d',
                        '643d69a5c3f7b9001cfa0943',
                        '643d69a5c3f7b9001cfa0945',
                        '643d69a5c3f7b9001cfa0943'
                      ],
                      status: 'done',
                      name: 'Space антарианский флюоресцентный бургер',
                      createdAt: '2023-10-11T16:34:27.656Z',
                      updatedAt: '2023-10-11T16:34:27.850Z',
                      number: 22934
                    }
                ],
                total: 2,
                totalToday: 1, 
            }
        })).toEqual({
            ...state,
            orders: [
                {
                  _id: '6526ce936d2997001cab1c77',
                  ingredients: [
                    '643d69a5c3f7b9001cfa093d',
                    '643d69a5c3f7b9001cfa0943',
                    '643d69a5c3f7b9001cfa0945',
                    '643d69a5c3f7b9001cfa0943'
                  ],
                  status: 'done',
                  name: 'Space антарианский флюоресцентный бургер',
                  createdAt: '2023-10-11T16:34:27.656Z',
                  updatedAt: '2023-10-11T16:34:27.850Z',
                  number: 22934
                }
            ],
            total: 2,
            totalToday: 1,
        })
    })

    test('WS_HISTORY_GET_MESSAGE', () => {
        const state = initalState;
        expect(wsHistoryReducer(state, { type: types.WS_HISTORY_GET_MESSAGE,
            payload: {
                orders: [
                    {
                      _id: '6526ce936d2997001cab1c77',
                      ingredients: [
                        '643d69a5c3f7b9001cfa093d',
                        '643d69a5c3f7b9001cfa0943',
                        '643d69a5c3f7b9001cfa0945',
                        '643d69a5c3f7b9001cfa0943'
                      ],
                      status: 'done',
                      name: 'Space антарианский флюоресцентный бургер',
                      createdAt: '2023-10-11T16:34:27.656Z',
                      updatedAt: '2023-10-11T16:34:27.850Z',
                      number: 22934
                    }
                ],
                total: 2,
                totalToday: 1, 
            }
        })).toEqual({
            ...state,
            error: undefined,
            orders: [
                {
                  _id: '6526ce936d2997001cab1c77',
                  ingredients: [
                    '643d69a5c3f7b9001cfa093d',
                    '643d69a5c3f7b9001cfa0943',
                    '643d69a5c3f7b9001cfa0945',
                    '643d69a5c3f7b9001cfa0943'
                  ],
                  status: 'done',
                  name: 'Space антарианский флюоресцентный бургер',
                  createdAt: '2023-10-11T16:34:27.656Z',
                  updatedAt: '2023-10-11T16:34:27.850Z',
                  number: 22934
                }
            ],
            total: 2,
            totalToday: 1,
        })
    })
})