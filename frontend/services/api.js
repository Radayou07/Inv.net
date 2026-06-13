import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const testDatabase = async () => {
    try {
        const response = await api.get('/test_db');
            
    } catch (error) {
        console.error('Error testing database connection:', error);
        return { status: 'error', message: 'Failed to connect to the database'};
    }
}

export default api;