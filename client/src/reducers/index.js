import { combineReducers } from 'redux';
import convertReducer from './convertReducer';

export default combineReducers({
    result: convertReducer
})