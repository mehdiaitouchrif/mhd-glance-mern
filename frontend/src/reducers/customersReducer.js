import {
    GET_CUSTOMERS,
    DELETE_CUSTOMER,
    CUSTOMERS_ERROR,
    SET_LOADING
} from '../actions/types';

const initialState = {
    customers: null,
    loading: null,
    error: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CUSTOMERS:
            return {
                ...state,
                loading: null,
                customers: action.payload
            }
        case DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter(customer => customer._id !== action.payload)
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case CUSTOMERS_ERROR:
            return {
                ...state,
                error: 'Error with customers'
            }
        default:
            return state;
    }
}
