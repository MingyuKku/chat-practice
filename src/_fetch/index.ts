import axios from "axios";

export function createAxios() {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    })


    return instance;
}