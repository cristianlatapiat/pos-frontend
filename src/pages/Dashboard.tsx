import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Dashboard - Punto de Venta
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutOutlined />}
            onClick={logout}
          >
            Cerrar Sesión
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            ¡Bienvenido/a!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Nombre:</strong> {user?.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Email:</strong> {user?.email}
          </Typography>
          <Typography variant="body1" color="success.main" paragraph>
            ✅ Autenticación con Azure AD funcionando correctamente
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            El backend aún no está implementado. Próximos pasos:
          </Typography>
          <ul>
            <li>Crear API en .NET Core 8</li>
            <li>Implementar módulo de ventas</li>
            <li>Implementar gestión de productos</li>
            <li>Implementar reportes</li>
          </ul>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;