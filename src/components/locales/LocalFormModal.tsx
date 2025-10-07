import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import type { Local, LocalCreateDTO } from '../../types';

interface LocalFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: LocalCreateDTO) => Promise<void>;
  local?: Local | null;
}

const LocalFormModal = ({ open, onClose, onSave, local }: LocalFormModalProps) => {
  const [formData, setFormData] = useState<LocalCreateDTO>({
    localName: '',
    address: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (local) {
      setFormData({
        localName: local.localName,
        address: local.address,
        phone: local.phone || '',
      });
    } else {
      setFormData({
        localName: '',
        address: '',
        phone: '',
      });
    }
    setErrors({});
  }, [local, open]);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.localName.trim()) {
      newErrors.localName = 'El nombre es requerido';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await onSave(formData);
      handleClose();
    } catch (error) {
      console.error('Error al guardar sucursal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        localName: '',
        address: '',
        phone: '',
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {local ? 'Editar Sucursal' : 'Nueva Sucursal'}
          <IconButton onClick={handleClose} disabled={loading} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2.5}>
            <TextField
              label="Nombre de la Sucursal"
              fullWidth
              required
              value={formData.localName}
              onChange={(e) =>
                setFormData({ ...formData, localName: e.target.value })
              }
              error={!!errors.localName}
              helperText={errors.localName}
              disabled={loading}
              placeholder="Ej: Sucursal Centro"
            />

            <TextField
              label="Dirección"
              fullWidth
              required
              multiline
              rows={2}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              error={!!errors.address}
              helperText={errors.address}
              disabled={loading}
              placeholder="Ej: Av. Principal 123, Centro, Santiago"
            />

            <TextField
              label="Teléfono"
              fullWidth
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={loading}
              placeholder="Ej: +56 2 2345 6789"
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ minWidth: 100 }}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LocalFormModal;
