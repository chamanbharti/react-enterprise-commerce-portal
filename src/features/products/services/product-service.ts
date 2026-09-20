import { ApiError } from '../../../shared/api/api-error'
import { products } from '../data/products'
import type {
  Product,
  ProductCategory,
  ProductDashboardData,
} from '../model/product'

const SIMULATED_LATENCY_MS = 10

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

export async function getProducts(): Promise<Product[]> {
  await delay(SIMULATED_LATENCY_MS)

  return [...products]
}

export async function getProductById(
  productId: string,
): Promise<Product> {
  await delay(SIMULATED_LATENCY_MS)

  const product = products.find(
    (currentProduct) =>
      currentProduct.id === productId,
  )

  if (!product) {
    throw new ApiError(
      `Product ${productId} was not found`,
      404,
    )
  }

  return product
}

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<Product[]> {
  await delay(SIMULATED_LATENCY_MS)

  return products.filter(
    (product) => product.category === category,
  )
}

export async function getProductDashboardData():
  Promise<ProductDashboardData> {
  const [
    allProducts,
    electronics,
    books,
  ] = await Promise.all([
    getProducts(),
    getProductsByCategory('ELECTRONICS'),
    getProductsByCategory('BOOKS'),
  ])

  return {
    products: allProducts,
    electronics,
    books,
  }
}