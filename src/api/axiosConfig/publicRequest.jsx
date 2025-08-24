import axios from 'axios';

export const publicRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false,
    headers:{
        "Access-Control-Allow-Origin":"*",
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});
