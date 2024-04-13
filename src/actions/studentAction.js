import {
    ALL_STUDENT_REQUEST,
    ALL_STUDENT_FAIL,
    ALL_STUDENT_SUCCESS,
    NEW_STUDENT_FAIL,
    NEW_STUDENT_REQUEST,
    NEW_STUDENT_SUCCESS,
    CLEAR_ERRORS,
    GET_STUDENT_REQUEST,
    GET_STUDENT_SUCCESS,
    GET_STUDENT_FAIL,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAIL,
    DELETE_STUDENT
} from "../constants/studentConstants";
import { Api } from "../Api";


// to get all students
export const getStudents = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_STUDENT_REQUEST });

        const token = (localStorage.getItem("token"));
        const config = { headers: { "Authorization" : `Bearer ${token}` } }
        const { data } = await Api.get(`/api/v1/students`, config);

        dispatch({ type: ALL_STUDENT_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: ALL_STUDENT_FAIL, payload: error.response.data.message })
    }
}


// to add a new student
export const newStudent = (studentData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_STUDENT_REQUEST });

        const token = (localStorage.getItem("token"));
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } }
        await Api.post(`/api/v1/student/add`, studentData, config);

        dispatch({ type: NEW_STUDENT_SUCCESS})

    } catch (error) {
        dispatch({ type: NEW_STUDENT_FAIL, payload: error.response.data.message, })
    }
}


// to get one student
export const getSingleStudent = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_STUDENT_REQUEST });

        const token = (localStorage.getItem("token"));
        const config = { headers: { "Authorization" : `Bearer ${token}`, "Content-Type" : "application/json" } }
        const { data } = await Api.get(`/api/v1/student/${id}`, config);

        dispatch({ type: GET_STUDENT_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: GET_STUDENT_FAIL, payload: error.response.data.message })
    }
}

// to update student
export const updateStudent = (id, studentData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_STUDENT_REQUEST });

        const token = (localStorage.getItem("token"));
        const config = { headers: { "Authorization" : `Bearer ${token}`, "Content-Type" : "application/json" } }

        await Api.put(`/api/v1/student/${id}`, studentData , config);

        dispatch({ type: UPDATE_STUDENT_SUCCESS })

    } catch (error) {
        dispatch({ type: UPDATE_STUDENT_FAIL, payload: error.response.data.message })
    }
}


// to delete a student
export const deleteStudent = (id) => async (dispatch) => {
        const token = (localStorage.getItem("token"));
        const config = { headers: { "Authorization" : `Bearer ${token}`, "Content-Type" : "application/json" } }
        await Api.delete(`/api/v1/student/${id}`, config);

        dispatch({ type: DELETE_STUDENT, payload: id })
}

// To clear the errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}