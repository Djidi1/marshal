import {
    LOGIN_SUCCESS,
} from '../actions/UserActions'

import { set } from 'idb-keyval';

const initialState = {
    id: 0,
    name: '',
    email: '',
    role_id: 0,
    shop_id: null,
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            set('user', action.payload).then();
            return { ...action.payload };
        default:
            return state
    }
}