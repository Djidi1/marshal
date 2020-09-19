import {ADD_REQUEST, DELETE_REQUEST, REQUESTS, UPDATE_REQUEST} from "../actions/DataActions";

const initialState = [];
let newState = [];
let reqIndex;

export function requestsReducer(state = initialState, action) {
    switch (action.type) {
        case REQUESTS:
            return action.payload;
        case ADD_REQUEST:
            newState = [...state];
            newState.push(action.payload);
            return newState;
        case UPDATE_REQUEST:
            const edited_req = action.payload;
            newState = [...state];
            reqIndex = newState.findIndex((req => req.id === edited_req.id));
            newState[reqIndex] = edited_req;
            return newState;
        case DELETE_REQUEST:
            const req_id = action.payload;
            newState = [...state];
            reqIndex = newState.findIndex((req => req.id === req_id));
            newState.splice(reqIndex, 1);
            return newState;
        default:
            return state
    }
}