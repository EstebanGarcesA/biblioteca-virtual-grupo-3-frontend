import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('biblioteca-auth')) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('biblioteca-auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('biblioteca-auth');
    }
  }, [user]);

  const login = (email) => {
    const userId = email.trim().toLowerCase();
    const nextUser = {
      id: userId,
      email,
      name: email.split('@')[0] || 'Usuario',
    };
    setUser(nextUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, login, logout, isLogged: Boolean(user) }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
