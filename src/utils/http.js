import axios from 'axios';
import { logout, useAuthStore } from '../store/auth.store';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    per_page: 20,
  },
});

http.interceptors.request.use((request) => {
  if (!request.headers) {
    request.headers = {};
  }
  const token = useAuthStore.getState().token;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      logout();
    }
    if (error.response.status === 403) {
    }
  }
);

export async function getRequest(url, params) {
  return http.get(url, { params }).then((response) => response.data);
}

export async function postRequest(url, params, headers) {
  return http.post(url, params, headers).then((response) => response.data);
}

export async function deleteRequest(url, params) {
  return http.delete(url, params).then((response) => response.data);
}
