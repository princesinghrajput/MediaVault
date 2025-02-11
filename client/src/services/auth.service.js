import api from './httpServices';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout as logoutAction
} from '../store/slices/userSlice';

const authService = {
  register: async (userData, dispatch) => {
    try {
      dispatch(registerStart());
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch(registerSuccess(response.data.user));
      }
      return response.data;
    } catch (error) {
      dispatch(registerFailure(error.response?.data?.message || 'Registration failed'));
      throw error;
    }
  },

  login: async (credentials, dispatch) => {
    try {
      dispatch(loginStart());
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch(loginSuccess(response.data.user));
      }
      return response.data;
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
      throw error;
    }
  },

  logout: (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutAction());
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService; 