import { createContext } from 'react';

// Interfaz simplificada de usuario (sin backend)
export interface User {
  name: string;
  email: string;
  azureId: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);