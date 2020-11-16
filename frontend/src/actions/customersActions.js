import {
    GET_CUSTOMERS,
    DELETE_CUSTOMER,
    CUSTOMERS_ERROR,
    SET_LOADING,
} from '../actions/types';

import axios from 'axios';

// Axios config
const config = {
    headers: { 'Content-Type': 'application/json' }
}


export const getCustomers = () => async dispatch => {
    try {
        setLoading()
        const res = await axios.get('/api/users')
        dispatch({
            type: GET_CUSTOMERS,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: CUSTOMERS_ERROR,
        })
    }
}

export const deleteCustomer = (id) => async dispatch => {
    try {
        await axios.delete(`/api/users/${id}`, config)
        dispatch({
            type: DELETE_CUSTOMER,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: CUSTOMERS_ERROR
        })
    }
}

export const setLoading = () => dispatch => dispatch({ type: SET_LOADING })