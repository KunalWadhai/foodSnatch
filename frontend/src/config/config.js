// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BACKEND_URL || import.meta.env.BACKEND_URL || 'http://localhost:3000',

  // Authentication endpoints
  AUTH: {
    USER_LOGIN: '/api/auth/user/login',
    USER_REGISTER: '/api/auth/user/register',
    FOOD_PARTNER_LOGIN: '/api/auth/food-partner/login',
    FOOD_PARTNER_REGISTER: '/api/auth/food-partner/register',
  },

  // Food endpoints
  FOOD: {
    BASE: '/api/food',
    // Add more food-related endpoints as needed
  },

  // Food Partner endpoints
  FOOD_PARTNER: {
    BASE: '/api/food-partner',
    // Add more food partner endpoints as needed
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Axios default configuration
export const axiosConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Legacy export for backward compatibility
export const backendUrl = API_CONFIG.BASE_URL;
