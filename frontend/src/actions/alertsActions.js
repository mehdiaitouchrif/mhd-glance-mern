import {
    SET_ALERT,
    CLEAR_ALERT
} from '../actions/types'

import { v4 as uuidv4 } from 'uuid';


export const setAlert = (msg, type) => async dispatch => {
    const id = uuidv4()
    await dispatch({
        type: SET_ALERT,
        payload: { type, msg, id }
    })

    setTimeout(() => {
        dispatch({ type: CLEAR_ALERT, payload: id })
    }, 3000)
}