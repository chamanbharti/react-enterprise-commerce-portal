import type { Product } from '../model/product'
import { formatCurrency } from '../../../shared/utils/currency'

interface ProductCardProps {
  product: Product
}

export function ProductCard({
  product,
}: ProductCardProps) {
  const stockText =
    product.stockQuantity === 0
      ? 'Out of stock'
      : `Stock: ${product.stockQuantity}`

  return (
    <article>
      <header>
        <h3>{product.name}</h3>
      </header>

      {product.description && (
        <p>{product.description}</p>
      )}

      <dl>
        <div>
          <dt>SKU</dt>
          <dd>{product.sku}</dd>
        </div>

        <div>
          <dt>Category</dt>
          <dd>{product.category}</dd>
        </div>

        <div>
          <dt>Status</dt>
          <dd>{product.status}</dd>
        </div>

        <div>
          <dt>Price</dt>
          <dd>{formatCurrency(product.price)}</dd>
        </div>

        <div>
          <dt>Inventory</dt>
          <dd>{stockText}</dd>
        </div>
      </dl>
    </article>
  )
}