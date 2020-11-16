import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import ordersReducer from './ordersReducer';
import customersReducer from './customersReducer';
import authReducer from './authReducer';
import alertsReducer from './alertsReducer';

export default combineReducers({
    products: productsReducer,
    auth: authReducer,
    orders: ordersReducer,
    customers: customersReducer,
    alerts: alertsReducer
});