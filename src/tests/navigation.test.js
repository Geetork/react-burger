import { profileNavigationReducer } from '../services/reducers/navigation';
import * as types from '../services/actions/navigation';

describe('Navigation reducer', () => {
    const initalState = {
        profile: 'profile',
        header: 'constructor'
    };

    test('initial State', () => {
        expect(profileNavigationReducer(undefined, { type: undefined })).toEqual(initalState)
    })

    test('SWITCH_PROFILE_NAVIGATION_ITEM', () => {
        const state = initalState;
        expect(profileNavigationReducer(state, { type: types.SWITCH_PROFILE_NAVIGATION_ITEM,
            current: 'orders'
        })).toEqual({
            ...state,
            profile: 'orders'
        })
    })

    test('SWITCH_HEADER_ITEM', () => {
        const state = initalState;
        expect(profileNavigationReducer(state, { type: types.SWITCH_HEADER_ITEM,
            current: 'feed'
        })).toEqual({
            ...state,
            header: 'feed'
        })
    })

    test('SET_NAVIGATION_INITIAL_STATE', () => {
        const state = initalState;
        expect(profileNavigationReducer(state, { type: types.SET_NAVIGATION_INITIAL_STATE })).toEqual({
            ...initalState
        })
    })
})
