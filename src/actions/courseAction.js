import {
    ALL_COURSE_REQUEST,
    ALL_COURSE_FAIL,
    ALL_COURSE_SUCCESS,
    NEW_COURSE_FAIL,
    NEW_COURSE_REQUEST,
    NEW_COURSE_SUCCESS,
    GET_COURSE_REQUEST,
    UPDATE_COURSE_REQUEST,
    CLEAR_ERRORS,
    GET_COURSE_SUCCESS,
    GET_COURSE_FAIL,
    UPDATE_COURSE_FAIL,
    UPDATE_COURSE_SUCCESS,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAIL
} from "../constants/courseConstants";
import { Api } from "../Api";


// to get all the courses
export const getCourses = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_COURSE_REQUEST });

        const token = (localStorage.getItem("token"));
        const config = {  headers: {"Authorization" : `Bearer ${token}`}  }

        const { data } = await Api.get(`/api/v1/courses`, config);
        
        dispatch({ type: ALL_COURSE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: ALL_COURSE_FAIL, payload: error.response.data.message })
    }
}


// to add a new course
export const newCourse = (courseData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_COURSE_REQUEST });

        const token = (localStorage.getItem("token"));
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } }
        await Api.post(`/api/v1/course/add`, courseData, config);

        dispatch({ type: NEW_COURSE_SUCCESS })

    } catch (error) {
        dispatch({ type: NEW_COURSE_FAIL, payload: error.response.data.message, })
    }
}

// to get a course
export const getCourse = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_COURSE_REQUEST });

        const token = (localStorage.getItem("token"));
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } }
        const {data} = await Api.get(`/api/v1/course/${id}`, config);

        dispatch({ type: GET_COURSE_SUCCESS, payload : data })

    } catch (error) {
        dispatch({ type: GET_COURSE_FAIL, payload: error.response.data.message, })
    }
}

// to update a course
export const updateCourse = (id, courseData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_COURSE_REQUEST });

        const token = (localStorage.getItem("token"));
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } }
        await Api.put(`/api/v1/course/${id}`, courseData, config);

        dispatch({ type: UPDATE_COURSE_SUCCESS })

    } catch (error) {
        dispatch({ type: UPDATE_COURSE_FAIL, payload: error.response.data.message, })
    }
}

// to delete a course
export const deleteCourse = (id) => async (dispatch) => {
    try {

        const token = (localStorage.getItem("token"));
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } }
        await Api.delete(`/api/v1/course/${id}`, config);

        dispatch({ type: DELETE_COURSE_SUCCESS, payload: id })

    } catch (error) {
        dispatch({ type: DELETE_COURSE_FAIL, payload: error.response.data.message, })
    }
}


// To clear the errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}