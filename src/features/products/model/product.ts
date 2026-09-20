export type ProductStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'DISCONTINUED'

export type ProductCategory =
  | 'ELECTRONICS'
  | 'FASHION'
  | 'HOME'
  | 'BOOKS'

export type SortDirection = 'ASC' | 'DESC'

export interface Product {
  readonly id: string
  readonly sku: string
  name: string
  description?: string
  price: number
  stockQuantity: number
  status: ProductStatus
  category: ProductCategory
  readonly createdAt: string
  updatedAt: string
}

export type ProductUpdate = Pick<
  Product,
  'name' | 'description' | 'price' | 'status' | 'category'
>

export interface ProductStatistics {
  totalProducts: number
  activeProducts: number
  outOfStockProducts: number
  totalInventoryValue: number
}

export interface ProductDashboardData {
  products: Product[]
  electronics: Product[]
  books: Product[]
}