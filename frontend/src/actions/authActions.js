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

import axios from 'axios';

// Axios config
const config = {
    headers: { 'Content-Type': 'application/json' }
}

export const loadUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/auth/currentUser')

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: NO_USER
        })
    }
}

export const register = (user) => async dispatch => {
    try {
        const res = await axios.post('/api/auth/register', user, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.token
        })

        dispatch(loadUser())
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.errors
        })
    }
}


export const login = (user) => async dispatch => {
    try {
        const res = await axios.post('/api/auth/login', user, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        })

        dispatch(loadUser())

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data
        })
        setTimeout(() => {
            dispatch(clearErrors())
        }, 3000)
    }
}


export const logout = () => async dispatch => {
    await axios.post('/api/auth/logout', config)
    dispatch({
        type: LOGOUT
    })
}

export const clearErrors = () => dispatch => dispatch({ type: CLEAR_ERROR })