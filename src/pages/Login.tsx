import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { LoginOutlined, ShoppingCart } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      await login();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            textAlign: 'center',
            borderRadius: 3,
          }}
        >
          {/* Logo/Icono */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <ShoppingCart
              sx={{
                fontSize: 80,
                color: 'primary.main',
              }}
            />
          </Box>

          {/* Título */}
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Punto de Venta
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Sistema de gestión multi-local
          </Typography>

          {/* Botón de login */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginOutlined />}
            onClick={handleLogin}
            disabled={isLoading}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none',
            }}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión con Microsoft'}
          </Button>

          {/* Información adicional */}
          <Typography variant="caption" color="text.secondary" mt={3} display="block">
            Inicia sesión con tu cuenta de Azure AD
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;