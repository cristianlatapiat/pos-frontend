import api from './api';
import type { Local, LocalCreateDTO, LocalUpdateDTO, ApiResponse } from '../types';

// Servicio para gestión de sucursales (locales)
export const localService = {
  // Obtener todas las sucursales
  getAll: async (): Promise<Local[]> => {
    const response = await api.get<ApiResponse<Local[]>>('/locales');
    return response.data.data || [];
  },

  // Obtener una sucursal por ID
  getById: async (id: number): Promise<Local> => {
    const response = await api.get<ApiResponse<Local>>(`/locales/${id}`);
    return response.data.data!;
  },

  // Crear nueva sucursal
  create: async (data: LocalCreateDTO): Promise<Local> => {
    const response = await api.post<ApiResponse<Local>>('/locales', data);
    return response.data.data!;
  },

  // Actualizar sucursal
  update: async (id: number, data: LocalUpdateDTO): Promise<Local> => {
    const response = await api.put<ApiResponse<Local>>(`/locales/${id}`, data);
    return response.data.data!;
  },

  // Activar/Desactivar sucursal
  toggleActive: async (id: number): Promise<Local> => {
    const response = await api.patch<ApiResponse<Local>>(`/locales/${id}/toggle-active`);
    return response.data.data!;
  },

  // Eliminar sucursal (soft delete)
  delete: async (id: number): Promise<void> => {
    await api.delete(`/locales/${id}`);
  },
};
