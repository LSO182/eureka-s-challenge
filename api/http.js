import axios from "axios";

export const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 5000,
    headers: { secretKey: process.env.VUE_APP_SECRET_KEY },
});
