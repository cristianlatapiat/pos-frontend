// ==================== USER & AUTH ====================
export interface User {
  userId: string;
  azureAdObjectId: string;
  email: string;
  fullName: string;
  roleId: number;
  roleName: string;
  localId?: number;
  localName?: string;
  isActive: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresAt: string;
}

export interface LoginRequest {
  azureAdToken: string;
}

// ==================== MENU ====================
export interface MenuItem {
  menuItemId: number;
  label: string;
  route: string;
  icon: string;
  parentMenuItemId?: number;
  order: number;
  isActive: boolean;
  children?: MenuItem[];
}

// ==================== ROLES ====================
export interface Role {
  roleId: number;
  roleName: string;
  description: string;
}

// ==================== LOCALES ====================
export interface Local {
  localId: number;
  localName: string;
  address: string;
  isActive: boolean;
  createdAt: string;
}

// ==================== CATEGORIES ====================
export interface Category {
  categoryId: number;
  categoryName: string;
  isActive: boolean;
}

// ==================== PRODUCTS ====================
export interface Product {
  productId: number;
  productCode: string;
  productName: string;
  price: number;
  categoryId: number;
  categoryName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateDTO {
  productCode: string;
  productName: string;
  price: number;
  categoryId: number;
}

export interface ProductUpdateDTO extends ProductCreateDTO {
  productId: number;
  isActive: boolean;
}

// ==================== SALES ====================
export interface Sale {
  saleId: number;
  saleNumber: string;
  localId: number;
  localName?: string;
  userId: string;
  userName?: string;
  saleDate: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  total: number;
  details: SaleDetail[];
  createdAt: string;
}

export interface SaleDetail {
  saleDetailId: number;
  saleId: number;
  productId: number;
  productName?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface SaleCreateDTO {
  localId: number;
  paymentMethod: PaymentMethod;
  items: SaleItemDTO[];
}

export interface SaleItemDTO {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export type PaymentMethod = 'Efectivo' | 'Tarjeta' | 'Transferencia';

// ==================== CART ====================
export interface CartItem {
  product: Product;
  quantity: number;
}

// ==================== REPORTS ====================
export interface SalesReport {
  localId?: number;
  localName?: string;
  startDate: string;
  endDate: string;
  totalSales: number;
  totalAmount: number;
  salesByPaymentMethod: PaymentMethodTotal[];
  topProducts: ProductSalesTotal[];
  salesByCashier: CashierSalesTotal[];
}

export interface PaymentMethodTotal {
  paymentMethod: PaymentMethod;
  count: number;
  total: number;
}

export interface ProductSalesTotal {
  productId: number;
  productName: string;
  quantitySold: number;
  totalRevenue: number;
}

export interface CashierSalesTotal {
  userId: string;
  userName: string;
  salesCount: number;
  totalAmount: number;
}

export interface DailyCashRegister {
  localId: number;
  localName: string;
  date: string;
  totalSales: number;
  totalAmount: number;
  cashTotal: number;
  cardTotal: number;
  transferTotal: number;
  sales: Sale[];
}

// ==================== API RESPONSES ====================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// ==================== COMMON ====================
export interface SelectOption {
  value: number | string;
  label: string;
}