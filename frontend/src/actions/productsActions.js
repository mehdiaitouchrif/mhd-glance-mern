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

import axios from 'axios';

// Axios config
const config = {
    headers: { 'Content-Type': 'application/json' }
}

export const getProducts = (query) => async dispatch => {
    try {
        setLoading();
        const res = await axios.get(`/api/products?${query ? query : ''}`);
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: error.response
        })
    }
}

export const getSearchResults = query => async dispatch => {
    try {
        setLoading();
        const res = await axios.get(`/api/products?search=${query}`);
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: error.response
        })
    }
}

console.log(Date.now())

export const getProduct = (id) => async dispatch => {
    try {
        setLoading();
        const res = await axios.get(`/api/products/${id}`);
        dispatch({
            type: GET_PRODUCT,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: error.response.data
        })
    }
}


export const addProduct = product => async dispatch => {
    try {
        const res = await axios.post('/api/products', product, config)

        dispatch({
            type: ADD_PRODUCT,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCTS_ERROR,
            errors: error.response.data
        })
    }
}

export const uploadImage = (formData, id) => async dispatch => {
    try {
        await axios.put(`/api/products/${id}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })

        dispatch({
            type: UPLOAD_IMAGE,
            payload: { _id: id }
        })

    } catch (error) {
        dispatch({
            type: PRODUCTS_ERROR
        })
        setTimeout(() => {
            dispatch(clearErr())
        }, 3000)
    }
}


export const updateProduct = (newProduct) => async dispatch => {
    try {
        setLoading()
        const res = await axios.put(`/api/products/${newProduct._id}`, newProduct, config)
        dispatch({
            type: UPDATE_PRODUCT,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: error.response.data.errors
        })
    }
}

export const deleteProduct = id => async dispatch => {
    await axios.delete(`/api/products/${id}`, config)
    dispatch({ type: DELETE_PRODUCT, payload: id });
}


export const addToCart = (product) => dispatch => {
    let cart;
    if (localStorage.getItem('cart') === null) {
        cart = [];
    } else {
        cart = JSON.parse(localStorage.getItem('cart'))
    }

    for (let i = 0; i < cart.length; i++) {
        if (cart[i]._id === product._id) {
            return null
        }
    }

    cart.push(product);
    console.log(cart)
    localStorage.setItem('cart', JSON.stringify(cart))

    dispatch({
        type: ADD_TO_CART,
        payload: cart
    })
}


export const getFromCart = () => dispatch => {
    let cart;
    if (localStorage.getItem('cart') === null) {
        cart = [];
    } else {
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    dispatch({
        type: GET_FROM_CART,
        payload: cart
    })
}


export const deleteFromCart = id => dispatch => {
    let cart;
    if (localStorage.getItem('cart') === null) {
        cart = [];
    } else {
        cart = JSON.parse(localStorage.getItem('cart'))
    }

    cart.forEach((item, index) => {
        if (item._id === id) {
            cart.splice(index, 1)
        }
    })

    localStorage.setItem("cart", JSON.stringify(cart))
    dispatch({
        type: DELETE_FROM_CART,
        payload: cart
    })

}

export const setLoading = () => dispatch => {
    dispatch({
        type: SET_LOADING
    })
}

export const clearErr = () => dispatch => dispatch({ type: CLEAR_ERROR })
