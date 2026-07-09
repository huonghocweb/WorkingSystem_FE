import axios from "axios";
console.log("Client Side Run by Axios Client");
const axiosClient = axios.create({
  baseURL: "/api/proxy",
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error?.response?.data?.message;
    return Promise.reject(new Error(message));
  },
);

export default axiosClient;
