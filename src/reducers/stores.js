import {
    STORE_REQUEST,
} from '../actions/StoresActions'

const initialState = [
    {
        id: 1,
        name: 'Title',
        description: 'Description',
        address: 'address',
        phone: 'phone',
        comment: 'comment',
        updated_at: new Date()
    },
    {
        id: 2,
        name: 'Title',
        description: 'Description',
        address: 'address',
        phone: 'phone',
        comment: 'comment',
        updated_at: new Date()
    },
    {
        id: 3,
        name: 'Title',
        description: 'Description',
        address: 'address',
        phone: 'phone',
        comment: 'comment',
        updated_at: new Date()
    },
    {
        id: 4,
        name: 'Title',
        description: 'Description',
        address: 'address',
        phone: 'phone',
        comment: 'comment',
        updated_at: new Date()
    },
];

export function storesReducer(state = initialState, action) {
    switch (action.type) {
        case STORE_REQUEST:
            return {...state, isFetching: true, error: ''};

        default:
            return state
    }
}