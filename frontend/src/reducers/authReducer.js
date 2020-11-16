import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    NO_USER,
    CLEAR_ERROR
} from '../actions/types';
import Cookies from 'js-cookie'


const initialState = {
    token: null,
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                token: Cookies.get('token')
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case NO_USER:
            Cookies.remove('token', { path: '/register' })
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                loading: false,
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