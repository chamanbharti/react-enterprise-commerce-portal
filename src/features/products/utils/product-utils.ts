import type {
  Product,
  ProductStatistics,
  SortDirection,
} from '../model/product'

export function getActiveProducts(
  products: Product[],
): Product[] {
  return products.filter(
    (product) => product.status === 'ACTIVE',
  )
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

export function findProductById(
  products: Product[],
  productId: string,
): Product | undefined {
  return products.find(
    (product) => product.id === productId,
  )
}

export function searchProducts(
  products: Product[],
  searchTerm: string,
): Product[] {
  const normalizedSearchTerm = searchTerm
    .trim()
    .toLowerCase()

  if (!normalizedSearchTerm) {
    return products
  }

  return products.filter((product) => {
    const name = product.name.toLowerCase()
    const sku = product.sku.toLowerCase()

    return (
      name.includes(normalizedSearchTerm) ||
      sku.includes(normalizedSearchTerm)
    )
  })
}

export function hasOutOfStockProducts(
  products: Product[],
): boolean {
  return products.some(
    (product) => product.stockQuantity === 0,
  )
}

export function areAllProductsPriced(
  products: Product[],
): boolean {
  return products.every(
    (product) => product.price > 0,
  )
}

export function sortProductsByPrice(
  products: Product[],
  direction: SortDirection,
): Product[] {
  return products.toSorted((first, second) => {
    if (direction === 'ASC') {
      return first.price - second.price
    }

    return second.price - first.price
  })
}

export function updateProductStock(
  products: Product[],
  productId: string,
  newQuantity: number,
): Product[] {
  return products.map((product) => {
    if (product.id !== productId) {
      return product
    }

    return {
      ...product,
      stockQuantity: newQuantity,
    }
  })
}

export function calculateProductStatistics(
  products: Product[],
): ProductStatistics {
  return {
    totalProducts: products.length,

    activeProducts: products.filter(
      (product) => product.status === 'ACTIVE',
    ).length,

    outOfStockProducts: products.filter(
      (product) => product.stockQuantity === 0,
    ).length,

    totalInventoryValue:
      calculateInventoryValue(products),
  }
}