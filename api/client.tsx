import { API_URL } from '@/constants';
import axios, { InternalAxiosRequestConfig } from 'axios';

// Interceptor for requests
async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.Accept = 'application/json';
  return config;
}

// Create the axios client
export const client = axios.create({
  baseURL: API_URL,
});

// Add interceptors
client.interceptors.request.use(authRequestInterceptor);
