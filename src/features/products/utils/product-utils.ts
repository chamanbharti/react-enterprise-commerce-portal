import type { Product } from '../model/products'

export function getActiveProducts(products: Product[]): Product[] {
  return products.filter((product) => product.status === 'ACTIVE')
}

export function getLowStockProducts(
  products: Product[],
  threshold: number,
): Product[] {
  return products.filter(
    (product) => product.stockQuantity <= threshold,
  )
}

export function calculateInventoryValue(
  products: Product[],
): number {
  return products.reduce(
    (total, product) =>
      total + product.price * product.stockQuantity,
    0,
  )
}