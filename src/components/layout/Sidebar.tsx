import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Collapse,
  Avatar,
  Divider,
  Badge,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  AddShoppingCart,
  ReceiptLong,
  Inventory,
  People,
  Store,
  Assessment,
  Settings,
  ExpandMore,
  ExpandLess,
  PointOfSale,
  ShoppingCart,
  TrendingUp,
  Category,
  AccountCircle,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  path?: string;
  badge?: string | number;
  highlight?: boolean;
  highlightText?: string;
  children?: Array<{
    title: string;
    path: string;
  }>;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['ventas']);

  // Configuración de navegación para ADMINISTRADOR
  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      icon: <Dashboard />,
      path: '/',
    },
    {
      title: 'Nueva Venta',
      icon: <AddShoppingCart />,
      path: '/nueva-venta',
      highlight: true,
      highlightText: 'PRINCIPAL',
    },
    {
      title: 'Mis Ventas',
      icon: <ReceiptLong />,
      badge: 12,
      children: [
        { title: 'Ventas del Día', path: '/ventas/dia' },
        { title: 'Historial', path: '/ventas/historial' },
        { title: 'Pendientes', path: '/ventas/pendientes' },
      ],
    },
    {
      title: 'Productos',
      icon: <Inventory />,
      children: [
        { title: 'Catálogo', path: '/productos/catalogo' },
        { title: 'Inventario', path: '/productos/inventario' },
        { title: 'Categorías', path: '/productos/categorias' },
      ],
    },
    {
      title: 'Sucursales',
      icon: <Store />,
      path: '/sucursales',
    },
    {
      title: 'Clientes',
      icon: <People />,
      path: '/clientes',
    },
    {
      title: 'Reportes',
      icon: <Assessment />,
      children: [
        { title: 'Ventas', path: '/reportes/ventas' },
        { title: 'Inventario', path: '/reportes/inventario' },
        { title: 'Financiero', path: '/reportes/financiero' },
      ],
    },
    {
      title: 'Configuración',
      icon: <Settings />,
      path: '/configuracion',
    },
  ];

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleSubmenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const isActive = (path?: string, children?: Array<{ path: string }>) => {
    if (path) {
      return location.pathname === path;
    }
    if (children) {
      return children.some((child) => location.pathname === child.path);
    }
    return false;
  };

  const drawerWidth = collapsed ? 70 : 280;

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 1,
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <PointOfSale sx={{ fontSize: 32, color: '#64b5f6' }} />
          {!collapsed && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                POS System
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.7rem' }}>
                Punto de Venta
              </Typography>
            </Box>
          )}
        </Box>
        {!isMobile && (
          <IconButton
            onClick={toggleCollapse}
            sx={{
              mt: 1,
              width: 36,
              height: 36,
              bgcolor: 'rgba(255,255,255,0.1)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Navigation */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255,255,255,0.05)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '3px',
          },
        }}
      >
        <List sx={{ pt: 2, pb: 2 }}>
          {/* Section Title */}
          {!collapsed && (
            <Typography
              variant="caption"
              sx={{
                px: 2.5,
                py: 1,
                display: 'block',
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1,
                opacity: 0.6,
              }}
            >
              OPERACIONES DIARIAS
            </Typography>
          )}

          {navItems.map((item) => (
            <Box key={item.title}>
              <ListItem
                disablePadding
                sx={{
                  display: 'block',
                  ...(item.highlight && {
                    background:
                      'linear-gradient(90deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.05) 100%)',
                    borderLeft: '4px solid #4caf50',
                    my: 0.5,
                  }),
                }}
              >
                <ListItemButton
                  selected={isActive(item.path, item.children)}
                  onClick={() => {
                    if (item.path) {
                      handleNavigation(item.path);
                    } else if (item.children) {
                      toggleSubmenu(item.title);
                    }
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    px: 2.5,
                    color: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                    },
                    '&.Mui-selected': {
                      bgcolor: 'rgba(255,255,255,0.15)',
                      color: 'white',
                      fontWeight: 500,
                      borderLeft: !item.highlight ? '4px solid #64b5f6' : undefined,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.2)',
                      },
                    },
                    ...(item.highlight && {
                      '&:hover': {
                        background:
                          'linear-gradient(90deg, rgba(76, 175, 80, 0.3) 0%, rgba(76, 175, 80, 0.1) 100%)',
                      },
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed ? 'auto' : 1.5,
                      justifyContent: 'center',
                      color: item.highlight ? '#4caf50' : 'inherit',
                    }}
                  >
                    {item.badge ? (
                      <Badge badgeContent={item.badge} color="error">
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                  {!collapsed && (
                    <>
                      <ListItemText
                        primary={item.title}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontSize: '0.875rem',
                            fontWeight: item.highlight ? 600 : 400,
                          },
                        }}
                      />
                      {item.highlightText && (
                        <Chip
                          label={item.highlightText}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.625rem',
                            bgcolor: '#4caf50',
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                      )}
                      {item.children && (
                        <>
                          {expandedMenus.includes(item.title) ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </>
                      )}
                    </>
                  )}
                </ListItemButton>
              </ListItem>

              {/* Submenu */}
              {item.children && !collapsed && (
                <Collapse
                  in={expandedMenus.includes(item.title)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding sx={{ bgcolor: 'rgba(0,0,0,0.1)' }}>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.path}
                        selected={location.pathname === child.path}
                        onClick={() => handleNavigation(child.path)}
                        sx={{
                          pl: 7,
                          py: 1.25,
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '0.8125rem',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.05)',
                            color: 'white',
                          },
                          '&.Mui-selected': {
                            color: '#64b5f6',
                            fontWeight: 500,
                            '&:hover': {
                              bgcolor: 'rgba(255,255,255,0.05)',
                            },
                          },
                          '&::before': {
                            content: '""',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: 'currentColor',
                            opacity: 0.5,
                            mr: 1.5,
                          },
                        }}
                      >
                        <ListItemText
                          primary={child.title}
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontSize: '0.8125rem',
                            },
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Box>

      {/* Footer - User Profile */}
      <Box
        sx={{
          p: 2.5,
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          {!collapsed && (
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user?.name || 'Usuario'}
              </Typography>
              <Chip
                label="Administrador"
                size="small"
                sx={{
                  height: 18,
                  fontSize: '0.625rem',
                  bgcolor: 'rgba(100, 181, 246, 0.3)',
                  color: 'white',
                  fontWeight: 600,
                  mt: 0.5,
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
