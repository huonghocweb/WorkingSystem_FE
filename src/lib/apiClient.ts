import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//add JWT
// apiClient.interceptors.request.use((config) => {
//   const accessToken = useAuthStore.getState().accessToken;
//   console.log("accessToken In ApiClient:  ", accessToken);
//   if (accessToken) {
//     console.log("add JWT vao axios: ", accessToken);
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });
