export const SHOPS_REQUEST = 'SHOPS_REQUEST';
export const SHOPS_FAVORITE = 'SHOPS_FAVORITE';
export const SHOPS_ADD_FAVORITE = 'SHOPS_ADD_FAVORITE';
export const SHOPS_DELETE_FAVORITE = 'SHOPS_DELETE_FAVORITE';
export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';
export const STATUSES_REQUEST = 'STATUSES_REQUEST';
export const REQUESTS = 'REQUESTS';
export const REQUEST = 'REQUEST';
export const ADD_REQUEST = 'ADD_REQUEST';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const RESPONSE = 'RESPONSE';
export const CARS = 'CARS';
export const ADD_CAR = 'ADD_CAR';
export const UPDATE_CAR = 'UPDATE_CAR';
export const DELETE_CAR = 'DELETE_CAR';
export const CAR_BRANDS = 'CAR_BRANDS';
export const CAR_MODELS = 'CAR_MODELS';

export function handleShops(callback) {
    return function(dispatch) {
        dispatch({
            type: SHOPS_REQUEST,
            payload: callback,
        })
    }
}
export function handleFavoriteShops(callback) {
    return function(dispatch) {
        dispatch({
            type: SHOPS_FAVORITE,
            payload: callback,
        })
    }
}
export function handleFavoriteShopAdd(callback) {
    return function(dispatch) {
        dispatch({
            type: SHOPS_ADD_FAVORITE,
            payload: callback,
        })
    }
}
export function handleFavoriteShopDelete(callback) {
    return function(dispatch) {
        dispatch({
            type: SHOPS_DELETE_FAVORITE,
            payload: callback,
        })
    }
}
export function handleCategories(payload) {
    return function(dispatch) {
        dispatch({
            type: CATEGORIES_REQUEST,
            payload: payload,
        })
    }
}
export function handleStatuses(payload) {
    return function(dispatch) {
        dispatch({
            type: STATUSES_REQUEST,
            payload: payload,
        })
    }
}
export function handleRequests(payload) {
    return function(dispatch) {
        dispatch({
            type: REQUESTS,
            payload: payload,
        })
    }
}
export function handleRequest(payload) {
    return function(dispatch) {
        dispatch({
            type: REQUEST,
            payload: payload,
        })
    }
}
export function handleResponse(payload) {
    return function(dispatch) {
        dispatch({
            type: RESPONSE,
            payload: payload,
        })
    }
}
export function handleAddRequests(payload) {
    return function(dispatch) {
        dispatch({
            type: ADD_REQUEST,
            payload: payload,
        })
    }
}
export function handleUpdateRequest(payload) {
    return function(dispatch) {
        dispatch({
            type:  UPDATE_REQUEST,
            payload: payload,
        })
    }
}
export function handleDeleteRequest(payload) {
    return function(dispatch) {
        dispatch({
            type:  DELETE_REQUEST,
            payload: payload,
        })
    }
}
export function handleAddCar(payload) {
    return function(dispatch) {
        dispatch({
            type: ADD_CAR,
            payload: payload,
        })
    }
}
export function handleUpdateCar(payload) {
    return function(dispatch) {
        dispatch({
            type: UPDATE_CAR,
            payload: payload,
        })
    }
}
export function handleDeleteCar(payload) {
    return function(dispatch) {
        dispatch({
            type: DELETE_CAR,
            payload: payload,
        })
    }
}
export function handleCars(payload) {
    return function(dispatch) {
        dispatch({
            type: CARS,
            payload: payload,
        })
    }
}
export function handleCarBrands(payload) {
    return function(dispatch) {
        dispatch({
            type: CAR_BRANDS,
            payload: payload,
        })
    }
}
export function handleCarModels(payload) {
    return function(dispatch) {
        dispatch({
            type: CAR_MODELS,
            payload: payload,
        })
    }
}