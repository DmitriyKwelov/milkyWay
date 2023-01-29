// import axios from "axios";
//
// export const API_URL = `http:/localhost:5000/api`
//
// const $api = axios.create({
//     withCredentials: true,
//     baseURL: 'http:/localhost:5000/api'
// })
//
// $api.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config;
// })
//
// export default $api
import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    // credentials: true,
    baseURL: 'http://localhost:5000/api'
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default instance;