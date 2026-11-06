import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';

const USER_KEY = 'gearpulse-user';
const THEME_KEY = 'gearpulse-theme';

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function readStoredTheme() {
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const loginCustomer = () => {
    setUser({ username: 'Aaron', role: 'customer', email: 'aaron@gear-enthusiast.com' });
  };

  const loginAdmin = () => {
    setUser({ username: 'GearPulse Admin', role: 'admin', email: 'admin@gearpulse.io' });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  const isAdmin = Boolean(user && user.role === 'admin');

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loginCustomer,
        loginAdmin,
        logout,
        theme,
        toggleTheme
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
