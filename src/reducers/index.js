import { combineReducers } from 'redux'
import { userReducer } from './user'
import { storesReducer } from './stores'
import { requestsReducer } from './requests'
import { stoReducer } from './sto'

export const rootReducer = combineReducers({
    user: userReducer,
    stores: storesReducer,
    sto: stoReducer,
    requests: requestsReducer,
});