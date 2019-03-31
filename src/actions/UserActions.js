export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function handleLogin(callback) {
    return function(dispatch) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: callback,
        })
    }
}