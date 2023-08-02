import { SWITCH_PROFILE_NAVIGATION_ITEM,
         SWITCH_HEADER_ITEM,
         SET_NAVIGATION_INITIAL_STATE } from "../actions/navigation";


const initialState = {
    profile: 'profile',
    header: 'constructor'
}

export const profileNavigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_PROFILE_NAVIGATION_ITEM: {
            return ({
                ...state,
                profile: action.current
            });
        }
        case SWITCH_HEADER_ITEM: {
            return {
                ...state,
                header: action.current
            }
        }
        case SET_NAVIGATION_INITIAL_STATE: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}