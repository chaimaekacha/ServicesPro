import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const userData = localStorage.getItem('adminUser');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const mockAdmin = {
        id: 1,
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Administrateur',
        role: 'admin',
        permissions: ['all']
      };

      if (email === mockAdmin.email && password === mockAdmin.password) {
        const userData = {
          id: mockAdmin.id,
          email: mockAdmin.email,
          name: mockAdmin.name,
          role: mockAdmin.role,
          permissions: mockAdmin.permissions
        };

        setUser(userData);
        setIsAuthenticated(true);
        
        localStorage.setItem('adminToken', 'mock-jwt-token-12345');
        localStorage.setItem('adminUser', JSON.stringify(userData));
        
        return { success: true, user: userData };
      } else {
        return { success: false, message: 'Identifiants incorrects' };
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return { success: false, message: 'Erreur de connexion' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions.includes('all') || user.permissions.includes(permission);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};