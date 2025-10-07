import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Breadcrumbs,
  Link,
  Badge,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  NavigateNext,
  Notifications,
  Search,
  Settings,
  Dashboard,
  Store,
  ShoppingCart,
  Inventory,
  People,
  Assessment,
} from '@mui/icons-material';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

// Mapeo de rutas a breadcrumbs
const routeConfig: Record<
  string,
  { label: string; icon?: React.ReactNode; parent?: string }
> = {
  '/': { label: 'Dashboard', icon: <Dashboard fontSize="small" /> },
  '/sucursales': { label: 'Sucursales', icon: <Store fontSize="small" />, parent: '/' },
  '/nueva-venta': { label: 'Nueva Venta', icon: <ShoppingCart fontSize="small" />, parent: '/' },
  '/ventas/dia': { label: 'Ventas del Día', parent: '/' },
  '/ventas/historial': { label: 'Historial', parent: '/' },
  '/ventas/pendientes': { label: 'Pendientes', parent: '/' },
  '/productos/catalogo': { label: 'Catálogo', parent: '/' },
  '/productos/inventario': { label: 'Inventario', parent: '/' },
  '/productos/categorias': { label: 'Categorías', parent: '/' },
  '/clientes': { label: 'Clientes', icon: <People fontSize="small" />, parent: '/' },
  '/reportes/ventas': { label: 'Reportes - Ventas', parent: '/' },
  '/reportes/inventario': { label: 'Reportes - Inventario', parent: '/' },
  '/reportes/financiero': { label: 'Reportes - Financiero', parent: '/' },
  '/configuracion': { label: 'Configuración', icon: <Settings fontSize="small" />, parent: '/' },
};

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Generar breadcrumbs basados en la ruta actual
  const getBreadcrumbs = () => {
    const currentRoute = routeConfig[location.pathname];
    if (!currentRoute) return [];

    const breadcrumbs = [currentRoute];
    let parentPath = currentRoute.parent;

    while (parentPath) {
      const parentRoute = routeConfig[parentPath];
      if (parentRoute) {
        breadcrumbs.unshift(parentRoute);
        parentPath = parentRoute.parent;
      } else {
        break;
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: '#f5f5f5',
        }}
      >
        {/* Top AppBar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'white',
            color: '#333',
            borderBottom: '1px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <Toolbar>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Breadcrumbs */}
            <Box sx={{ flexGrow: 1 }}>
              <Breadcrumbs
                separator={<NavigateNext fontSize="small" sx={{ color: '#999' }} />}
                aria-label="breadcrumb"
              >
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  const path = Object.keys(routeConfig).find(
                    (key) => routeConfig[key].label === crumb.label
                  );

                  return isLast ? (
                    <Box
                      key={crumb.label}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: '#333',
                        fontWeight: 500,
                      }}
                    >
                      {crumb.icon}
                      <Typography variant="body2">{crumb.label}</Typography>
                    </Box>
                  ) : (
                    <Link
                      key={crumb.label}
                      underline="hover"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: '#1976d2',
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#1565c0',
                        },
                      }}
                      onClick={() => path && navigate(path)}
                    >
                      {crumb.icon}
                      <Typography variant="body2">{crumb.label}</Typography>
                    </Link>
                  );
                })}
              </Breadcrumbs>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                sx={{
                  bgcolor: '#f5f5f5',
                  '&:hover': { bgcolor: '#e0e0e0' },
                }}
              >
                <Search sx={{ color: '#666' }} />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: '#f5f5f5',
                  '&:hover': { bgcolor: '#e0e0e0' },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <Notifications sx={{ color: '#666' }} />
                </Badge>
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: '#f5f5f5',
                  '&:hover': { bgcolor: '#e0e0e0' },
                }}
              >
                <Settings sx={{ color: '#666' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
