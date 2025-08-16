import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getMe, logout as apiLogout } from '../api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    checkLoggedInUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiLogin(email, password);
      setUser(response.data.user);
      navigate('/tasks');
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      await apiRegister(email, password);
      await login(email, password);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const value = { user, loadingUser, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loadingUser && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};