import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Crear instancia de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
});

// Request Interceptor - Agregar access token de Azure AD a cada request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem('access_token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Manejo centralizado de errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Token expirado o inválido
    if (error.response?.status === 401) {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('user');
      window.location.href = '/login';
    }

    // Forbidden
    if (error.response?.status === 403) {
      console.error('No tienes permisos para realizar esta acción');
    }

    // Server error
    if (error.response?.status === 500) {
      console.error('Error del servidor. Por favor, intenta más tarde.');
    }

    return Promise.reject(error);
  }
);

export default api;