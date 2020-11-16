import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    PRODUCTS_ERROR,
    SET_LOADING,
    ADD_TO_CART,
    GET_FROM_CART,
    DELETE_FROM_CART,
    UPLOAD_IMAGE,
    CLEAR_ERROR
} from '../actions/types';

const initialState = {
    products: null,
    product: null,
    cart: null,
    loading: null,
    currentId: null,
    error: null,
}


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PRODUCTS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case GET_PRODUCT:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
                currentId: action.payload._id,
            }
        case UPDATE_PRODUCT:
        case UPLOAD_IMAGE:
            return {
                ...state,
                products: state.products && state.products.map(product => product._id === action.payload._id ? action.payload : product),
                loading: null
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.payload),
            }
        case ADD_TO_CART:
            return {
                ...state,
                cart: action.payload
            }
        case GET_FROM_CART:
            return {
                ...state,
                cart: action.payload
            }
        case DELETE_FROM_CART:
            return {
                ...state,
                cart: action.payload
            }
        case PRODUCTS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}