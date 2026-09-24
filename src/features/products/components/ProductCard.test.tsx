import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Product } from '../model/product'
import { ProductCard } from './ProductCard'

const product: Product = {
  id: 'PRD-TEST-001',
  sku: 'MBP-TEST-001',
  name: 'MacBook Pro 14',
  description: 'Professional laptop',
  price: 169999,
  stockQuantity: 10,
  status: 'ACTIVE',
  category: 'ELECTRONICS',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
}

describe('ProductCard', () => {
  it('renders product information', () => {
    render(<ProductCard product={product} />)

    expect(
      screen.getByRole('heading', {
        name: 'MacBook Pro 14',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('MBP-TEST-001'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('ELECTRONICS'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('ACTIVE'),
    ).toBeInTheDocument()

    expect(
      screen.getByText(/₹\s?1,69,999\.00/),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Stock: 10'),
    ).toBeInTheDocument()
  })

  it('renders description when present', () => {
    render(<ProductCard product={product} />)

    expect(
      screen.getByText('Professional laptop'),
    ).toBeInTheDocument()
  })

  it('renders out-of-stock message when stock is zero', () => {
    const outOfStockProduct: Product = {
      ...product,
      stockQuantity: 0,
    }

    render(
      <ProductCard product={outOfStockProduct} />,
    )

    expect(
      screen.getByText('Out of stock'),
    ).toBeInTheDocument()
  })

  it('does not render description when absent', () => {
    const productWithoutDescription: Product = {
      ...product,
      description: undefined,
    }

    render(
      <ProductCard
        product={productWithoutDescription}
      />,
    )

    expect(
      screen.queryByText('Professional laptop'),
    ).not.toBeInTheDocument()
  })
})