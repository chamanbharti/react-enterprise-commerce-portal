import type { Product } from '../model/product'
import { ProductList } from './ProductList'
import { ProductSummary } from './ProductSummary'

interface ProductCatalogProps {
  products: Product[]
}

export function ProductCatalog({
  products,
}: ProductCatalogProps) {
  return (
    <section aria-labelledby="product-catalog-heading">
      <h2 id="product-catalog-heading">
        Product Catalog
      </h2>

      <ProductSummary products={products} />

      <ProductList products={products} />
    </section>
  )
}