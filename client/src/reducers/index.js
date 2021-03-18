import { combineReducers } from 'redux';
/*
const valueReducer = () => {
    return {
        value: ''
    }
}

const selectedValueReducer = (selectedValue=null, action) => {
    if(action.type === 'VALUE_SELECTED') {
        return action.payload
    } 
    return selectedValue
}

export default combineReducers({
    values: valueReducer,
    selectedValue: selectedValueReducer
}) */

import itemReducer from './itemReducer';

export default combineReducers({
    item: itemReducer
});
