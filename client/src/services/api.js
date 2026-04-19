import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  return req;
});

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
};

export const goalAPI = {
  getGoals: () => API.get('/goals'),
  createGoal: (data) => API.post('/goals', data),
};

export const taskAPI = {
  getDailyTasks: () => API.get('/tasks/daily'),
  updateTask: (id, status) => API.patch(`/tasks/${id}`, { status }),
};

export default API;
