export type ProductStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'DISCONTINUED'

export type ProductCategory =
  | 'ELECTRONICS'
  | 'FASHION'
  | 'HOME'
  | 'BOOKS'

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