import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Store,
  Add,
  Search,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { localService } from '../services/localService';
import LocalCard from '../components/locales/LocalCard';
import LocalFormModal from '../components/locales/LocalFormModal';
import type { Local, LocalCreateDTO } from '../types';

const Locales = () => {
  const [locales, setLocales] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState<Local | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    loadLocales();
  }, []);

  const loadLocales = async () => {
    try {
      setLoading(true);
      const data = await localService.getAll();
      setLocales(data);
    } catch (error) {
      console.error('Error al cargar sucursales:', error);
      showSnackbar('Error al cargar las sucursales', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedLocal(null);
    setModalOpen(true);
  };

  const handleEdit = (local: Local) => {
    setSelectedLocal(local);
    setModalOpen(true);
  };

  const handleSave = async (data: LocalCreateDTO) => {
    try {
      if (selectedLocal) {
        await localService.update(selectedLocal.localId, {
          ...data,
          localId: selectedLocal.localId,
          isActive: selectedLocal.isActive,
        });
        showSnackbar('Sucursal actualizada correctamente', 'success');
      } else {
        await localService.create(data);
        showSnackbar('Sucursal creada correctamente', 'success');
      }
      await loadLocales();
    } catch (error) {
      console.error('Error al guardar sucursal:', error);
      showSnackbar('Error al guardar la sucursal', 'error');
      throw error;
    }
  };

  const handleToggleActive = async (local: Local) => {
    try {
      await localService.toggleActive(local.localId);
      showSnackbar(
        `Sucursal ${local.isActive ? 'desactivada' : 'activada'} correctamente`,
        'success'
      );
      await loadLocales();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      showSnackbar('Error al cambiar el estado de la sucursal', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  // Filtrar sucursales según búsqueda
  const filteredLocales = useMemo(() => {
    if (!searchTerm.trim()) return locales;

    const term = searchTerm.toLowerCase();
    return locales.filter(
      (local) =>
        local.localName?.toLowerCase().includes(term) ||
        local.localCode?.toLowerCase().includes(term) ||
        local.address?.toLowerCase().includes(term)
    );
  }, [locales, searchTerm]);

  // Estadísticas
  const stats = useMemo(() => {
    const total = locales.length;
    const active = locales.filter((l) => l.isActive).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [locales]);

  return (
    <Box>
      {/* Header */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Store sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h4" fontWeight={500} color="primary">
            Gestión de Sucursales
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreate}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: 2,
          }}
        >
          Nueva Sucursal
        </Button>
      </Paper>

      {/* Búsqueda */}
      <Paper elevation={2} sx={{ p: 2.5, mb: 3 }}>
        <Box position="relative" maxWidth={500}>
          <Search
            sx={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666',
            }}
          />
          <TextField
            fullWidth
            placeholder="Buscar por nombre, código o dirección..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                pl: 5,
              },
            }}
          />
        </Box>
      </Paper>

      {/* Estadísticas */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
              }}
            >
              <Store />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={500}>
                {stats.total}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                Total Sucursales
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#e8f5e9',
                color: '#2e7d32',
              }}
            >
              <CheckCircle />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={500}>
                {stats.active}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                Activas
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffebee',
                color: '#c62828',
              }}
            >
              <Cancel />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={500}>
                {stats.inactive}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                Inactivas
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Grid de Tarjetas */}
      {loading ? (
        <Box textAlign="center" py={8}>
          <Typography color="text.secondary">Cargando...</Typography>
        </Box>
      ) : filteredLocales.length === 0 ? (
        <Paper elevation={2} sx={{ p: 8, textAlign: 'center' }}>
          <Store sx={{ fontSize: 80, color: '#ddd', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchTerm
              ? 'No se encontraron sucursales'
              : 'No hay sucursales registradas'}
          </Typography>
          <Typography color="text.secondary" mb={3}>
            {searchTerm
              ? 'Intenta con otro término de búsqueda'
              : 'Comienza creando tu primera sucursal'}
          </Typography>
          {!searchTerm && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreate}
              sx={{ textTransform: 'none' }}
            >
              Crear Primera Sucursal
            </Button>
          )}
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredLocales.map((local) => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={local.localId}>
              <LocalCard
                local={local}
                onEdit={handleEdit}
                onToggleActive={handleToggleActive}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal de Formulario */}
      <LocalFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        local={selectedLocal}
      />

      {/* Snackbar de notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Locales;
