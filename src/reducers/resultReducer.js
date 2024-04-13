import {
    ALL_RESULT_REQUEST,
    ALL_RESULT_FAIL,
    ALL_RESULT_SUCCESS,
    NEW_RESULT_FAIL,
    NEW_RESULT_REQUEST,
    NEW_RESULT_SUCCESS,
    NEW_RESULT_RESET,
    CLEAR_ERRORS,
    GET_RESULT_REQUEST,
    GET_RESULT_SUCCESS,
    GET_RESULT_FAIL,
    UPDATE_RESULT_SUCCESS,
    UPDATE_RESULT_REQUEST,
    UPDATE_RESULT_FAIL,
    UPDATE_RESULT_RESET,
    DELETE_RESULT_SUCCESS
} from "../constants/resultConstants";



export const resultReducer = (state = { results : [] }, action) => {

    switch (action.type) {
        case ALL_RESULT_REQUEST:
            return {
                loading: true,
                results: [],
            };

        case ALL_RESULT_SUCCESS:
            return {
                loading: false,
                results: action.payload,
            };
        case DELETE_RESULT_SUCCESS:
            return {
                ...state,
                results: state.results.filter(r => r.id !== action.payload),
            }

        case ALL_RESULT_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }

}


export const newResultReducer = (state = {}, action) => {

    switch (action.type) {
        case NEW_RESULT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_RESULT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAdded: true,
            };

        case NEW_RESULT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case NEW_RESULT_RESET:
            return {
                ...state,
                isAdded: false,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

export const resultDetailsReducer = (state = { result : {}}, action) => {
    switch(action.type){
        case GET_RESULT_REQUEST:
        case UPDATE_RESULT_REQUEST:
            return {
                ...state,
                loading: true,
                isUpdated: false,
            }
        case GET_RESULT_SUCCESS:
            return {
                ...state,
                loading : false,
                result: action.payload
            }
        case UPDATE_RESULT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true
            }
        case GET_RESULT_FAIL:
        case UPDATE_RESULT_FAIL:
            return {
                ...state,
                loading: false,
                isUpdated: false,
                error: action.payload
            }
        case UPDATE_RESULT_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}