import { STATUSES_REQUEST } from "../actions/DataActions";

const initialState = [];

export function statusesReducer(state = initialState, action) {
    switch (action.type) {
        case STATUSES_REQUEST:
            return action.payload;
        default:
            return state
    }
}