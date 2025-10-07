import { Typography, Button, Box, Grid, Card, CardContent, CardActions, Paper } from '@mui/material';
import { LogoutOutlined, Store, ShoppingCart, Inventory, Assessment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box>
      {/* Header con botón de cerrar sesión */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
              ¡Bienvenido/a, {user?.name}!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutOutlined />}
            onClick={logout}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Paper>

      {/* Módulos del Sistema */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Módulos del Sistema
        </Typography>

          <Grid container spacing={3}>
            {/* Sucursales */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <Store sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    Sucursales
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gestiona las sucursales de tu negocio
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/sucursales')}
                    sx={{ textTransform: 'none' }}
                  >
                    Acceder
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Ventas */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  opacity: 0.6,
                }}
              >
                <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <ShoppingCart sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    Ventas
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Próximamente
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    variant="outlined"
                    disabled
                    sx={{ textTransform: 'none' }}
                  >
                    Próximamente
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Productos */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  opacity: 0.6,
                }}
              >
                <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <Inventory sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    Productos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Próximamente
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    variant="outlined"
                    disabled
                    sx={{ textTransform: 'none' }}
                  >
                    Próximamente
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Reportes */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  opacity: 0.6,
                }}
              >
                <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <Assessment sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    Reportes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Próximamente
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    variant="outlined"
                    disabled
                    sx={{ textTransform: 'none' }}
                  >
                    Próximamente
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;