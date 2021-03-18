import { createContext } from 'react';
import { GET_ITEMS, 
         ADD_ITEM, 
         DELETE_ITEM, 
         REMOVE_ITEM,
         REMOVE_MANUFACTURER,
         REMOVE_MODEL,
         REMOVE_PRODUCTION_YEAR,
         REMOVE_GAS,
         REMOVE_GAS_CHECKBOX,
         REMOVE_CC,
         REMOVE_HORSE_POWER,
         ADD_MANUFACTURER, 
         ADD_MODEL, 
         ADD_PRODUCTION_YEAR,
         ADD_SUB_TYPE,
         ADD_GAS,
         ADD_GAS_ALL,
         ADD_CC,
         ADD_HORSE_POWER,
         ADD_IMAGES,
         UPLOAD_MANUFACTURERS_LIST,
         MANUFACTURER_SELECTED,
         UPLOAD_SLIDER_INDEX,
         CHANGE_MODAL0_STATE,
         CHANGE_MODAL1_STATE,
         CHANGE_MODAL2_STATE,  
         CHANGE_MODAL3_STATE, 
         UPLOAD_PRODUCTION_YEARS,
         UPLOAD_MODELS,
         UPLOAD_GAS,
         UPLOAD_CC,
         UPLOAD_HP,
         UPLOAD_MAIN_MODAL_STATE,
         UPLOAD_IMG_ROW,
         SLIDER_ROW,
         ADD_SEARCH_INPUT,
         ADD_SEARCH_INPUT_MANUFACTURER,
         ADD_SEARCH_INPUT_MODEL,
         ADD_SEARCH_INPUT_PRODUCTION_YEAR,
         ADD_SEARCH_INPUT_GAS,
         ADD_SEARCH_INPUT_CC,
         ADD_SEARCH_INPUT_HP,
         INVOKE_INPUT_SEARCH,
         INVOKE_INPUT_SEARCH_MANUFACTURER
         } from './types';
// akcije na state-u
export const getItems = () => {
    return {
        type: GET_ITEMS
    }
}

export const addItem = name => {
    return {
        type: ADD_ITEM,
        payload: name
    }
}

export const deleteItem = id => {
    return {
        type: DELETE_ITEM,
        payload: id
    }
}

// creating new action for "new manufacturer"
export const addManufacturer = manufacturer => {
    return {
        type: ADD_MANUFACTURER,
        payload: manufacturer
    }
}

export const addModel = model => {
    return {
        type: ADD_MODEL,
        payload: model
    }
}

export const addProductionYear = year => {
    return {
        type: ADD_PRODUCTION_YEAR,
        payload: year
    }
}

export const addSubType = subType => {
    return {
        type: ADD_SUB_TYPE,
        payload: subType
    }
}

export const removeItem = item => {
    return {
        type: REMOVE_ITEM,
        payload: item
    }
}

export const removeManufacturer = manufacturer => {
    return {
        type: REMOVE_MANUFACTURER,
        payload: manufacturer
    }
}

export const removeModel = model => {
    return {
        type: REMOVE_MODEL,
        payload: model
    }
}

export const removeProudctionYear = prodYear => {
    return {
        type: REMOVE_PRODUCTION_YEAR,
        payload: prodYear
    }
}

export const removeGas = gas => {
    return {
        type: REMOVE_GAS,
        payload: gas
    }
}

export const removeCC = cc => {
    return {
        type: REMOVE_CC,
        payload: cc
    }
}

export const removeHorsePower = hp => {
    return {
        type: REMOVE_HORSE_POWER,
        payload: hp
    }
}

export const addGas = gas => {
    return {
        type: ADD_GAS,
        payload: gas
    }
}

export const addGasAll = gasArr => {
    return {
        type: ADD_GAS_ALL,
        payload: gasArr
    }
}

export const addCC = cc => {
    return {
        type: ADD_CC,
        payload: cc
    }
}

export const addHorsePower = hp => {
    return {
        type: ADD_HORSE_POWER,
        payload: hp
    }
}

export const addImages = image => {
    return {
        type: ADD_IMAGES,
        payload: image
    }
}

export const addManufacturersToList = list => {
    return {
        type: UPLOAD_MANUFACTURERS_LIST,
        payload: list
    }
}

export const setStateManufacturerSelected = bool => {
    return {
        type: MANUFACTURER_SELECTED,
        payload: bool
    }
}

export const uploadSliderIndex = index => {
    return {
        type: UPLOAD_SLIDER_INDEX,
        payload: index
    }
}

export const changeModal0State = state => {
    return {
        type: CHANGE_MODAL0_STATE,
        payload: state
    }
}
export const changeModal1State = state => {
    return {
        type: CHANGE_MODAL1_STATE,
        payload: state
    }
}

export const changeModal2State = state => {
    return {
        type: CHANGE_MODAL2_STATE,
        payload: state
    }
}

export const changeModal3State = state => {
    return {
        type: CHANGE_MODAL3_STATE,
        payload: state
    }
}
export const uploadProductionYear = year => {
    return {
        type: UPLOAD_PRODUCTION_YEARS,
        payload: year
    }
}

export const uploadModel = model => {
    return {
        type: UPLOAD_MODELS,
        payload: model
    }
}

export const uploadGas = gas => {
    return {
        type: UPLOAD_GAS,
        payload: gas
    }
}

export const uploadCC = cc => {
    return {
        type: UPLOAD_CC,
        payload: cc
    }
}

export const uploadHP = hp => {
    return {
        type: UPLOAD_HP,
        payload: hp
    }
}

export const uploadMainModalState = state => {
    return {
        type: UPLOAD_MAIN_MODAL_STATE,
        payload: state
    }
}

export const uploadImgRow = upload => {
    return {
        type: UPLOAD_IMG_ROW,
        payload: upload
    }
}

export const sliderRow = slider => {
    return {
        type: SLIDER_ROW,
        payload: slider
    }
}

export const addSearchInput = input => {
    return {
        type: ADD_SEARCH_INPUT,
        payload: input
    }
}

export const addSearchInputManufacturer = input => {
    return {
        type: ADD_SEARCH_INPUT_MANUFACTURER,
        payload: input
    }
}

export const addSearchInputModel = input => {
    return {
        type: ADD_SEARCH_INPUT_MODEL,
        payload: input
    }
}

export const addSearchInputProductionYear = input => {
    return {
        type: ADD_SEARCH_INPUT_PRODUCTION_YEAR,
        payload: input
    }
}

export const addSearchInputGas = input => {
    return {
        type: ADD_SEARCH_INPUT_GAS,
        payload: input
    }
}

export const addSearchInputCC = input => {
    return {
        type: ADD_SEARCH_INPUT_CC,
        payload: input
    }
}

export const addSearchInputHP = input => {
    return {
        type: ADD_SEARCH_INPUT_HP,
        payload: input
    }
}

export const invokeInputSearch = input => {
    return {
        type: INVOKE_INPUT_SEARCH,
        payload: input
    }
}

export const invokeInputSearchManufacturer = input => {
    return {
        type: INVOKE_INPUT_SEARCH_MANUFACTURER,
        payload: input
    }
}


