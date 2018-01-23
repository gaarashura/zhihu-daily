import { combineReducers } from 'redux';
import { TOGGLE_LOADING } from './action';

function toggleLoading(state = false, action) {
    switch (action.type) {
        case TOGGLE_LOADING:
            return action.status;
        default:
            return state;
    }
}

export default combineReducers({
    globalLoading: toggleLoading
});