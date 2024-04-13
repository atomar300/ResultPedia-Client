import {
    ALL_RESULT_REQUEST,
    ALL_RESULT_FAIL,
    ALL_RESULT_SUCCESS,
    NEW_RESULT_FAIL,
    NEW_RESULT_REQUEST,
    NEW_RESULT_SUCCESS,
    CLEAR_ERRORS,
    GET_RESULT_REQUEST,
    GET_RESULT_SUCCESS,
    GET_RESULT_FAIL,
    UPDATE_RESULT_REQUEST,
    UPDATE_RESULT_SUCCESS,
    UPDATE_RESULT_FAIL,
    DELETE_RESULT_SUCCESS,
    DELETE_RESULT_FAIL
} from "../constants/resultConstants";
import { Api } from "../Api";


// to get all the results
export const getResults = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_RESULT_REQUEST });

        const token = (localStorage.getItem("token"));
        const config = { headers: { "Content-Type": "application/json","Authorization" : `Bearer ${token}` } }
        const { data } = await Api.get(`/api/v1/results`, config);

        dispatch({ type: ALL_RESULT_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: ALL_RESULT_FAIL, payload: error.response.data.message })
    }
}


// to add a new result
export const newResult = (resultData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_RESULT_REQUEST });


        const token = (localStorage.getItem("token"));
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } }
        await Api.post(`/api/v1/result/add`, resultData, config);

        dispatch({ type: NEW_RESULT_SUCCESS })

    } catch (error) {
        dispatch({ type: NEW_RESULT_FAIL, payload: error.response.data.message, })
    }
}


// to get a result
export const getResult = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_RESULT_REQUEST });

        const token = (localStorage.getItem("token"));
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } }
        const {data} = await Api.get(`/api/v1/result/${id}`, config);

        dispatch({ type: GET_RESULT_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: GET_RESULT_FAIL, payload: error.response.data.message, })
    }
}


// to delete a result
export const deleteResult = (id) => async (dispatch) => {
    try {
        const token = (localStorage.getItem("token"));
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } }
        await Api.delete(`/api/v1/result/${id}`, config);

        dispatch({ type: DELETE_RESULT_SUCCESS, payload: id })

    } catch (error) {
        dispatch({ type: DELETE_RESULT_FAIL, payload: error.response.data.message, })
    }
}


// to update a result
export const updateResult = (resultData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_RESULT_REQUEST });

        const token = (localStorage.getItem("token"));
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } }
        await Api.put(`/api/v1/result/${resultData.id}`, resultData, config);

        dispatch({ type: UPDATE_RESULT_SUCCESS })

    } catch (error) {
        dispatch({ type: UPDATE_RESULT_FAIL, payload: error.response.data.message, })
    }
}


// To clear the errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}