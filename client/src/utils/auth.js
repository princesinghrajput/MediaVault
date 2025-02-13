// Check if user is authenticated
export const checkAuth = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return {
    isAuthenticated: !!token,
    user: user ? JSON.parse(user) : null
  };
}; 