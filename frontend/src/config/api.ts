// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.PUBLIC_API_URL || 'http://localhost:3001',
  ENDPOINTS: {
    SEND_EMAIL: '/api/send-email',
    HEALTH: '/api/health'
  }
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
