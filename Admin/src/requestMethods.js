import axios from "axios";

// Update BASE_URL to your deployed backend URL
const BASE_URL = "http://localhost:8000/api/v1";


export const publicRequest = axios.create({
    baseURL: BASE_URL
});
