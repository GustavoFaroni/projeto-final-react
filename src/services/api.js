import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://loja-api-ten.vercel.app/api',
  timeout: 10000,
});

export default api;
