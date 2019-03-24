export const STORE_REQUEST = 'STORE_REQUEST';

export function handleLogin(callback) {
    return function(dispatch) {
        dispatch({
            type: STORE_REQUEST,
        })
    }
}