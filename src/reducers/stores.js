import {
    SHOPS_REQUEST,
    CATEGORIES_REQUEST,
} from '../actions/DataActions'

const initialState = {
    shops: [
        {
            id: 1,
            name: 'Title',
            description: 'Description',
            address: 'address',
            phone: 'phone',
            comment: 'comment',
            updated_at: new Date()
        }],
    categories: [
        {
            id: 1,
            name: 'Title',
        }],
    };

export function storesReducer(state = initialState, action) {
    switch (action.type) {
        case SHOPS_REQUEST:
            return {...state, shops: action.payload};
        case CATEGORIES_REQUEST:
            return {...state, categories: action.payload};

        default:
            return state
    }
}