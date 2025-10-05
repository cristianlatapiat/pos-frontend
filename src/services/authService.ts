import api from './api';
import type { AuthResponse, LoginRequest, User } from '../types';

class AuthService {
  // Login con token de Azure AD
  async loginWithAzureToken(azureAdToken: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', {
      azureAdToken,
    } as LoginRequest);
    
    // Guardar token y usuario en sessionStorage
    if (response.data.token) {
      sessionStorage.setItem('jwt_token', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  // Obtener usuario actual del sessionStorage
  getCurrentUser(): User | null {
    const userStr = sessionStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }

  // Obtener token JWT
  getToken(): string | null {
    return sessionStorage.getItem('jwt_token');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!token && !!user;
  }

  // Verificar si el usuario es Admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.roleName === 'Admin';
  }

  // Verificar si el usuario es Cajero
  isCashier(): boolean {
    const user = this.getCurrentUser();
    return user?.roleName === 'Cajero';
  }

  // Logout
  logout(): void {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('menu');
  }

  // Refrescar datos del usuario desde el backend
  async refreshUser(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    sessionStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  }
}

export default new AuthService();