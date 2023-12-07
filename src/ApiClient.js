import axios from "axios";
import { constants } from './constants/Constants';

const useApiClient = () => {
    const defaultOptions = {
       method: ['get', 'post', 'put', 'delete'],
    };
    const axiosInstance = axios.create(defaultOptions);

    // Add a request interceptor
    axiosInstance.interceptors.request.use(
        async (config) => {
            config.baseURL = constants.apiEndPointUrl;
            return config;
        },
        (error) => {
            // Handle request error
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}

export default useApiClient;