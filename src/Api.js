import axios from "axios"

export const Api = axios.create(
    {
        //baseURL : process.env.REACT_APP_BASE_URL
        baseURL : "http://localhost:8080"
    })
