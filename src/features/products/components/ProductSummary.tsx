import type { Product } from '../model/product'
import { calculateProductStatistics } from '../utils/product-utils'
import { formatCurrency } from '../../../shared/utils/currency'

interface ProductSummaryProps {
  products: Product[]
}

export function ProductSummary({
  products,
}: ProductSummaryProps) {
  const statistics =
    calculateProductStatistics(products)

  return (
    <section aria-labelledby="product-summary-heading">
      <h3 id="product-summary-heading">
        Product Summary
      </h3>

      <dl>
        <div>
          <dt>Total Products</dt>
          <dd>{statistics.totalProducts}</dd>
        </div>

        <div>
          <dt>Active Products</dt>
          <dd>{statistics.activeProducts}</dd>
        </div>

        <div>
          <dt>Out of Stock</dt>
          <dd>{statistics.outOfStockProducts}</dd>
        </div>

        <div>
          <dt>Inventory Value</dt>
          <dd>
            {formatCurrency(
              statistics.totalInventoryValue,
            )}
          </dd>
        </div>
      </dl>
    </section>
  )
}