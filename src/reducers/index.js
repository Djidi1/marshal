import { combineReducers } from 'redux'
import { userReducer } from './user'
import { storesReducer } from './stores'
import { requestsReducer } from './requests'
import { requestReducer } from './request'
import { carsReducer } from './cars'
import { carModelsReducer } from './carmodels'
import { carBrandsReducer } from './carbrands'
import { responseReducer } from './response'
import { stoReducer } from './sto'
import { statusesReducer } from './statuses'
import { answersReducer } from './answers'

export const rootReducer = combineReducers({
    user: userReducer,
    stores: storesReducer,
    sto: stoReducer,
    requests: requestsReducer,
    request: requestReducer,
    response: responseReducer,
    cars: carsReducer,
    carbrands: carBrandsReducer,
    carmodels: carModelsReducer,
    statuses: statusesReducer,
    answers: answersReducer,
});