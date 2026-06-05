import axios from "axios";
import { error } from "console";

const axiosClient = axios.create({
    baseURL:'/api/proxy'
})

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error?.response?.data?.message;
        return Promise.reject(new Error(message));
    }
)

export default axiosClient;