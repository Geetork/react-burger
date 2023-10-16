import { profileNavigationReducer } from '../services/reducers/navigation';
import * as types from '../services/actions/navigation';
import { initialState } from '../services/reducers/navigation';

describe('Navigation reducer', () => {
    test('initial State', () => {
        expect(profileNavigationReducer(undefined, { type: undefined })).toEqual(initialState)
    })

    test('SWITCH_PROFILE_NAVIGATION_ITEM', () => {
        const state = initialState;
        expect(profileNavigationReducer(state, { type: types.SWITCH_PROFILE_NAVIGATION_ITEM,
            current: 'orders'
        })).toEqual({
            ...state,
            profile: 'orders'
        })
    })

    test('SWITCH_HEADER_ITEM', () => {
        const state = initialState;
        expect(profileNavigationReducer(state, { type: types.SWITCH_HEADER_ITEM,
            current: 'feed'
        })).toEqual({
            ...state,
            header: 'feed'
        })
    })

    test('SET_NAVIGATION_INITIAL_STATE', () => {
        const state = initialState;
        expect(profileNavigationReducer(state, { type: types.SET_NAVIGATION_INITIAL_STATE })).toEqual({
            ...initialState
        })
    })
})
