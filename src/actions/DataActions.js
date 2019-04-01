export const SHOPS_REQUEST = 'SHOPS_REQUEST';
export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';

export function handleShops(callback) {
    return function(dispatch) {
        dispatch({
            type: SHOPS_REQUEST,
            payload: callback,
        })
    }
}
export function handleCategories(callback) {
    return function(dispatch) {
        dispatch({
            type: CATEGORIES_REQUEST,
            payload: callback,
        })
    }
}