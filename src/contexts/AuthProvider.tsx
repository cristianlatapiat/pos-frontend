import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../services/msalConfig';
import { AuthContext } from './AuthContext';
import type { User, AuthContextType } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { instance, accounts } = useMsal();

  useEffect(() => {
    // Verificar si ya hay una sesión activa en Azure AD
    if (accounts.length > 0) {
      const account = accounts[0];
      const userData: User = {
        name: account.name || 'Usuario',
        email: account.username,
        azureId: account.homeAccountId,
      };
      setUser(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
    } else {
      // Intentar cargar desde sessionStorage
      const savedUser = sessionStorage.getItem('user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          sessionStorage.removeItem('user');
        }
      }
    }
    setIsLoading(false);
  }, [accounts]);

  const login = async () => {
    try {
      setIsLoading(true);

      // Login con Azure AD usando popup
      const response = await instance.loginPopup(loginRequest);

      if (response.account) {
        // Obtener access token para enviar al backend
        const tokenResponse = await instance.acquireTokenSilent({
          ...loginRequest,
          account: response.account,
        });

        const userData: User = {
          name: response.account.name || 'Usuario',
          email: response.account.username,
          azureId: response.account.homeAccountId,
        };
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('access_token', tokenResponse.accessToken);
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('access_token');
    setUser(null);

    // Logout de Azure AD
    instance.logoutPopup({
      postLogoutRedirectUri: '/',
    });
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};