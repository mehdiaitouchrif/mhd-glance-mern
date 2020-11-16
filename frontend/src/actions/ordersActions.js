import {
    GET_ORDERS,
    GET_USER_ORDERS,
    GET_ORDER,
    PLACE_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER,
    ORDERS_ERROR,
    SET_LOADING,
    UPDATE_PRODUCT
} from '../actions/types';

import axios from 'axios';

// Axios config
const config = {
    headers: { 'Content-Type': 'application/json' }
}

export const getOrders = () => async dispatch => {
    try {
        setLoading()
        const res = await axios.get('/api/orders')
        dispatch({
            type: GET_ORDERS,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({ type: ORDERS_ERROR, payload: error.response.data })
    }
}

export const getOrder = (id) => async dispatch => {
    try {
        setLoading()
        const res = await axios.get(`/api/orders/${id}`)
        dispatch({
            type: GET_ORDER,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: ORDERS_ERROR,
            error: error.response.data
        })
    }
}

export const updateOrder = (order) => async dispatch => {
    try {
        setLoading()
        const res = await axios.put(`/api/orders/${order._id}`, order, config)
        dispatch({
            type: UPDATE_ORDER,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: ORDERS_ERROR,
            payload: error.response.data
        })
    }
}

export const getUserOrders = id => async dispatch => {
    try {
        setLoading()
        const res = await axios.get(`/api/users/${id}/orders`)
        dispatch({
            type: GET_USER_ORDERS,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: ORDERS_ERROR,
            payload: error.response.data
        })
    }
}

export const placeOrder = order => async dispatch => {
    try {
        setLoading()
        const res = await axios.post('/api/orders', order, config);
        dispatch({
            type: PLACE_ORDER,
            payload: res.data.data
        })
    } catch (error) {
        console.log(error.response)
        dispatch({
            type: ORDERS_ERROR,
            payload: error.response
        })
    }
}

export const cancelOrder = id => async dispatch => {
    try {
        setLoading()
        await axios.delete(`/api/orders/${id}`)
        dispatch({
            type: DELETE_ORDER,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: ORDERS_ERROR,
            payload: error.response.data
        })
    }
}

export const setLoading = () => dispatch => {
    dispatch({ type: SET_LOADING })
}