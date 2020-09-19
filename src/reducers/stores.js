import {
    SHOPS_REQUEST,
    SHOPS_FAVORITE,
    SHOPS_ADD_FAVORITE,
    SHOPS_DELETE_FAVORITE,
    CATEGORIES_REQUEST,
} from '../actions/DataActions'

const initialState = {
    shops: [],
    favorite_shops: [],
    categories: [],
};

let newState;
let shopIndex;

export function storesReducer(state = initialState, action) {
    switch (action.type) {
        case SHOPS_REQUEST:
            return {...state, shops: action.payload};
        case SHOPS_FAVORITE:
            return {...state, favorite_shops: action.payload};
        case SHOPS_ADD_FAVORITE:
            newState = [...state.favorite_shops];
            newState.push(action.payload);
            return {...state, favorite_shops: newState};
        case SHOPS_DELETE_FAVORITE:
            const shop_id = action.payload;
            newState = [...state.favorite_shops];
            shopIndex = newState.findIndex((shop => shop.id === shop_id));
            newState.splice(shopIndex, 1);
            return {...state, favorite_shops: newState};
        case CATEGORIES_REQUEST:
            return {...state, categories: action.payload};

        default:
            return state
    }
}