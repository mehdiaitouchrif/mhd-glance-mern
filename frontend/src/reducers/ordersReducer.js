import {
    GET_ORDERS,
    GET_USER_ORDERS,
    GET_ORDER,
    PLACE_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER,
    ORDERS_ERROR,
    SET_LOADING
} from '../actions/types';

const initialState = {
    orders: null,
    order: null,
    userOrders: null,
    loading: null,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: null
            }
        case GET_ORDER:
            return {
                ...state,
                order: action.payload,
                loading: null
            }
        case GET_USER_ORDERS:
            return {
                ...state,
                userOrders: action.payload,
                loading: null
            }
        case PLACE_ORDER:
            return {
                ...state,
                orders: state.orders && [...state.orders, action.payload],
                loading: null,
            }
        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders && state.orders.filter(order => order._id !== action.payload),
                loading: null
            }
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders && state.orders.map(order => order._id === action.payload._id ? action.payload : order),
                loading: null
            }
        case ORDERS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: null,
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}