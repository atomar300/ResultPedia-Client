import {
    ALL_COURSE_REQUEST,
    ALL_COURSE_FAIL,
    ALL_COURSE_SUCCESS,
    NEW_COURSE_FAIL,
    NEW_COURSE_REQUEST,
    NEW_COURSE_SUCCESS,
    NEW_COURSE_RESET,
    CLEAR_ERRORS,
    GET_COURSE_REQUEST,
    GET_COURSE_SUCCESS,
    GET_COURSE_FAIL,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_RESET,
    UPDATE_COURSE_FAIL,
    DELETE_COURSE_FAIL,
    DELETE_COURSE_SUCCESS
} from "../constants/courseConstants";



export const courseReducer = (state = { courses: [] }, action) => {

    switch (action.type) {
        case ALL_COURSE_REQUEST:
            return {
                loading: true,
                courses: [],
            };

        case ALL_COURSE_SUCCESS:
            return {
                loading: false,
                courses: action.payload,
            };

        case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                courses: state.courses.filter(c => c.id !== action.payload)
            }

        case ALL_COURSE_FAIL:
        case DELETE_COURSE_FAIL:
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



export const newCourseReducer = (state = {}, action) => {

    switch (action.type) {
        case NEW_COURSE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                isAdded: true,
            };

        case NEW_COURSE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case NEW_COURSE_RESET:
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


export const courseDetailsReducer = (state = {course: {}}, action) => {
    switch(action.type){
        case GET_COURSE_REQUEST:
        case UPDATE_COURSE_REQUEST:
            return {
                ...state,
                loading : true,
                isUpdated: false
            }
        case GET_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                course: action.payload,
            }
        case UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
            }

        case UPDATE_COURSE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case GET_COURSE_FAIL:
        case UPDATE_COURSE_FAIL:
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error : null
            }
        default:
            return state;
    }
}