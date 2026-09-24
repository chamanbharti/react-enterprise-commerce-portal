import type { Product } from '../model/product'
import { ProductCard } from './ProductCard'

interface ProductListProps {
  products: Product[]
}

export function ProductList({
  products,
}: ProductListProps) {
  if (products.length === 0) {
    return <p>No products available.</p>
  }

  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}