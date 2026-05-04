import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Cache for 60 seconds
const CACHE_DURATION = 60 * 1000;
let homeDataCache = null;
let lastFetchTime = 0;

const fetchWithTimeout = async (promise, timeout = 5000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    )
  ]);
};

export const getHomeData = async () => {
  const now = Date.now();
  if (homeDataCache && (now - lastFetchTime < CACHE_DURATION)) {
    return homeDataCache;
  }

  try {
    const { data } = await fetchWithTimeout(api.get('/products/homeData'));
    homeDataCache = data;
    lastFetchTime = now;
    return data;
  } catch (error) {
    // If it's a timeout or error, we might want to return the cache anyway if it exists
    if (homeDataCache) return homeDataCache;
    throw error;
  }
};

export const getProducts = async (params = {}) => {
  const { data } = await api.get('/products', { params });
  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createOrder = async (payload) => {
  const { data } = await api.post('/orders', payload);
  return data;
};

export const getOrdersByUser = async (userId) => {
  const { data } = await api.get(`/orders/user/${userId}`);
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

export const updateProfile = async (profileData) => {
  const { data } = await api.put('/auth/profile', profileData);
  return data;
};

export default api;
