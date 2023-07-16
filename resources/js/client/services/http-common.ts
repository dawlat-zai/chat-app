import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "/",
    headers: {
        common: {
            "X-Requested-With": "XMLHttpRequest",
        },
    },
});

export default apiClient;
