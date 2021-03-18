import { GET_ITEMS, 
         ADD_ITEM, 
         DELETE_ITEM, 
         REMOVE_ITEM,
         REMOVE_MANUFACTURER,
         REMOVE_MODEL,
         REMOVE_PRODUCTION_YEAR,
         REMOVE_GAS,
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
         } from '../actions/types';

const initialState = {
    item: '',
    items: [],
    manufacturer: [],
    model: [],
    productionYear: [],
    subType: [],
    gas: [],
    cc: [],
    horsePower: [],
    images: [],
    manufacturersList: [],
    manufacturerSelected: true,
    sliderIndex: 0,
    modal0: false,
    modal1: false,
    modal2: false,
    modal3: false,
    productionYears: [],
    mainModalState: false,
    uploadImg: true,
    slider: false,
    searchInput: "",
    manufacturerInput: "",
    modelInput: "",
    prodYearInput: "",
    gasInput: "",
    ccInput: "",
    hpInput: "",
    invokeInputSearch: false,
    invokeInputSearchManufacturer: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            }
        case REMOVE_ITEM:
            return {
                ...state,
                item: action.payload
            }
        case REMOVE_MANUFACTURER: 
            return {
                ...state,
                manufacturer: action.payload
            }
        case REMOVE_MODEL: {
            return {
                ...state,
                model: action.payload
            }
        }
        case REMOVE_PRODUCTION_YEAR: {
            return {
                ...state,
                productionYear: action.payload
            }
        }
        case REMOVE_GAS: {
            return {
                ...state,
                gas: action.payload
            }
        }
        case REMOVE_CC: {
            return {
                ...state,
                cc: action.payload
            }
        }
        case REMOVE_HORSE_POWER: {
            return {
                ...state,
                horsePower: action.payload
            }
        }
        case ADD_ITEM: 
            return {
                ...state,
                item: action.payload
            } 
        // adding new action into reducer
        case ADD_MANUFACTURER:
            return {
                ...state,
                manufacturer: [...state.manufacturer, action.payload]
            }
        case ADD_MODEL:
            return {
                ...state,
                model: [...state.model, action.payload]
            }
        case ADD_PRODUCTION_YEAR: 
            return {
                ...state,
                productionYear: [...state.productionYear, action.payload]
            }
        case ADD_SUB_TYPE:
            return {
                ...state,
                subType: [...state.subType, action.payload]
            }
        case ADD_GAS:
            return {
                ...state,
                gas: [...state.gas, action.payload]
            }
        case ADD_GAS_ALL: 
            return {
                ...state,
                gas: action.payload
            }
        case ADD_CC: {
            return {
                ...state,
                cc: action.payload
            }
        }
        case ADD_HORSE_POWER: {
            return {
                ...state,
                horsePower: action.payload
            }
        }
        case ADD_IMAGES: {
            return {
                ...state,
                images: [...state.images, action.payload]
            }
        }
        case UPLOAD_MANUFACTURERS_LIST: {
            return {
                ...state,
                manufacturersList: [...state.manufacturersList, action.payload]
            }
        }
        case MANUFACTURER_SELECTED: {
            return {
                ...state,
                manufacturerSelected: action.payload
            }
        }
        case UPLOAD_SLIDER_INDEX: {
            return {
                ...state,
                sliderIndex: action.payload
            }
        }
        case CHANGE_MODAL0_STATE: {
            return {
                ...state,
                modal0: action.payload
            }
        }
        case CHANGE_MODAL1_STATE: {
            return {
                ...state,
                modal1: action.payload
            }
        }
        case CHANGE_MODAL2_STATE: {
            return {
                ...state,
                modal2: action.payload
            }
        }
        case CHANGE_MODAL3_STATE: {
            return {
                ...state,
                modal3: action.payload
            }
        }
        case UPLOAD_PRODUCTION_YEARS: {
            return {
                ...state,
                productionYears: action.payload
            }
        }
        case UPLOAD_MODELS: {
            return {
                ...state,
                models: action.payload
            }
        }
        case UPLOAD_MAIN_MODAL_STATE: {
            return {
                ...state,
                mainModalState: action.payload
            }
        }
        case UPLOAD_IMG_ROW: {
            return {
                ...state,
                uploadImg: action.payload
            }
        }
        case SLIDER_ROW: {
            return {
                ...state,
                slider: action.payload
            }
        }
        case ADD_SEARCH_INPUT: {
            return {
                ...state,
                searchInput: action.payload
            }
        }
        case ADD_SEARCH_INPUT_MANUFACTURER: {
            return {
                ...state,
                manufacturerInput: action.payload
            }
        }
        case ADD_SEARCH_INPUT_MODEL: {
            return {
                ...state,
                modelInput: action.payload
            }
        }
        case ADD_SEARCH_INPUT_PRODUCTION_YEAR: {
            return {
                ...state,
                prodYearInput: action.payload
            }
        }
        case ADD_SEARCH_INPUT_GAS: {
            return {
                ...state,
                gasInput: action.payload
            }
        }
        case ADD_SEARCH_INPUT_CC: {
            return {
                ...state,
                ccInput: action.payload
            }
        }
        case ADD_SEARCH_INPUT_HP: {
            return {
                ...state,
                hpInput: action.payload
            }
        }
        case INVOKE_INPUT_SEARCH: {
            return {
                ...state,
                invokeInputSearch: action.payload
            }
        }
        case INVOKE_INPUT_SEARCH_MANUFACTURER: {
            return {
                ...state,
                invokeInputSearchManufacturer: action.payload
            }
        }
        default: {
            return state;
        }
    }
}