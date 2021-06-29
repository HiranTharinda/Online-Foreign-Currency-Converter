import axios from 'axios';
import {
    CONVERT,
    CONVERT_FAILED,
} from './types';

export const convertCurrency = (data) => async dispatch => {
    const url = 'convert';
    try {
        await axios.post(url, data)
            .then(res =>
                dispatch({
                    type: CONVERT,
                    payload: res.data,
                })
            )
    } catch (err) {
        dispatch({
            type: CONVERT_FAILED,
            payload: err,
        })
    }
}
