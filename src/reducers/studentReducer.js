import {
    ALL_STUDENT_REQUEST,
    ALL_STUDENT_FAIL,
    ALL_STUDENT_SUCCESS,
    NEW_STUDENT_FAIL,
    NEW_STUDENT_REQUEST,
    NEW_STUDENT_SUCCESS,
    NEW_STUDENT_RESET,
    GET_STUDENT_REQUEST,
    GET_STUDENT_SUCCESS,
    GET_STUDENT_FAIL,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAIL,
    UPDATE_STUDENT_RESET,
    DELETE_STUDENT,
    CLEAR_ERRORS
} from "../constants/studentConstants";



export const studentReducer = (state = { students: [] }, action) => {

    switch (action.type) {
        case ALL_STUDENT_REQUEST:
            return {
                loading: true,
                students: [],
            };

        case ALL_STUDENT_SUCCESS:
            return {
                loading: false,
                students: action.payload,
            };

        case DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(s => s.id !== action.payload),
            }

        case ALL_STUDENT_FAIL:
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



export const newStudentReducer = (state = {}, action) => {

    switch (action.type) {
        case NEW_STUDENT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAdded: true,
            };

        case NEW_STUDENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case NEW_STUDENT_RESET:
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


export const studentDetailsReducer = (state = { student: {} }, action) => {
    switch (action.type) {
        case GET_STUDENT_REQUEST:
        case UPDATE_STUDENT_REQUEST:
            return {
                ...state,
                loading: true,
                isUpdated: false,
            }
        case GET_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                student: action.payload,
            }

        case UPDATE_STUDENT_SUCCESS:
            return{
                ...state,
                isUpdated: true,
            }

        case GET_STUDENT_FAIL:
        case UPDATE_STUDENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isUpdated: false,
            }

        case UPDATE_STUDENT_RESET:
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