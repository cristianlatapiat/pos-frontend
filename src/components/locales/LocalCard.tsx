import { Card, Box, Typography, Chip, Button } from '@mui/material';
import {
  LocationOn,
  Phone,
  Schedule,
  Edit,
  ToggleOn,
  ToggleOff,
} from '@mui/icons-material';
import type { Local } from '../../types';

interface LocalCardProps {
  local: Local;
  onEdit: (local: Local) => void;
  onToggleActive: (local: Local) => void;
}

const LocalCard = ({ local, onEdit, onToggleActive }: LocalCardProps) => {
  const isActive = local.isActive;

  // Gradientes según el mockup
  const gradientActive = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
  const gradientInactive = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      {/* Header con gradiente */}
      <Box
        sx={{
          background: isActive ? gradientActive : gradientInactive,
          color: 'white',
          p: 2.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box flex={1}>
          <Typography variant="h6" fontWeight={500} gutterBottom>
            {local.localName}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 300 }}>
            Código: {local.localCode}
          </Typography>
        </Box>
        <Chip
          label={isActive ? 'Activa' : 'Inactiva'}
          size="small"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            color: 'white',
            fontWeight: 500,
            fontSize: '0.688rem',
            backdropFilter: 'blur(10px)',
          }}
        />
      </Box>

      {/* Body con información */}
      <Box sx={{ p: 2.5 }}>
        {/* Dirección */}
        <Box display="flex" gap={1.5} mb={2}>
          <LocationOn sx={{ color: '#666', fontSize: 20, mt: 0.25 }} />
          <Box flex={1}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontSize: '0.688rem',
              }}
            >
              Dirección
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
              {local.address}
            </Typography>
          </Box>
        </Box>

        {/* Teléfono */}
        <Box display="flex" gap={1.5} mb={2}>
          <Phone sx={{ color: '#666', fontSize: 20, mt: 0.25 }} />
          <Box flex={1}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontSize: '0.688rem',
              }}
            >
              Teléfono
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
              {local.phone || 'No especificado'}
            </Typography>
          </Box>
        </Box>

        {/* Fecha de creación */}
        <Box display="flex" gap={1.5}>
          <Schedule sx={{ color: '#666', fontSize: 20, mt: 0.25 }} />
          <Box flex={1}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontSize: '0.688rem',
              }}
            >
              Fecha de Creación
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
              {formatDate(local.createdAt)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Actions */}
      <Box
        sx={{
          p: 2,
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => onEdit(local)}
          sx={{
            flex: 1,
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Editar
        </Button>
        <Button
          variant="outlined"
          startIcon={isActive ? <ToggleOn /> : <ToggleOff />}
          onClick={() => onToggleActive(local)}
          sx={{
            flex: 1,
            textTransform: 'none',
            fontWeight: 500,
            borderColor: isActive ? '#2e7d32' : '#c62828',
            color: isActive ? '#2e7d32' : '#c62828',
            '&:hover': {
              borderColor: isActive ? '#2e7d32' : '#c62828',
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          {isActive ? 'Desactivar' : 'Activar'}
        </Button>
      </Box>
    </Card>
  );
};

export default LocalCard;
