import {
    CONVERT,
    CONVERT_FAILED,
} from '../actions/types';

const initialState = {
    result: null,
    symbols: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case CONVERT:
            return {
                result: action.payload,
            };
        case CONVERT_FAILED:
            return {
                result: action.payload,
            };
        default:
            return state;
    }
}