import { ANSWERS } from "../actions/DataActions";

const initialState = [];

export function answersReducer(state = initialState, action) {
    switch (action.type) {
        case ANSWERS:
            return action.payload;
        default:
            return state
    }
}