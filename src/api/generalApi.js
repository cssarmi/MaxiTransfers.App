import axios from 'axios';
import store from '@/store/index';
import { connections_confg } from '@/utils/connection_config';

const generalApi = axios.create({
    baseURL: connections_confg.baseURL,
});

generalApi.interceptors.request.use((config) => {
    config.baseURL =
        config.baseURL;
    config.headers = {
        ...config.headers,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };
    return config;
});

export default generalApi;