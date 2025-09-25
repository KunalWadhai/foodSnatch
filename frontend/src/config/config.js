// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BACKEND_URL,
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Legacy export for backward compatibility
export const backendUrl = API_CONFIG.BASE_URL;
