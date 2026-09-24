import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Product } from '../model/product'
import { ProductSummary } from './ProductSummary'

const products: Product[] = [
  {
    id: 'PRD-001',
    sku: 'TEST-001',
    name: 'Product One',
    price: 100,
    stockQuantity: 10,
    status: 'ACTIVE',
    category: 'ELECTRONICS',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'PRD-002',
    sku: 'TEST-002',
    name: 'Product Two',
    price: 200,
    stockQuantity: 5,
    status: 'INACTIVE',
    category: 'HOME',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'PRD-003',
    sku: 'TEST-003',
    name: 'Product Three',
    price: 50,
    stockQuantity: 0,
    status: 'DISCONTINUED',
    category: 'BOOKS',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
]

describe('ProductSummary', () => {
  it('renders the product summary heading', () => {
    render(
      <ProductSummary products={products} />,
    )

    expect(
      screen.getByRole('heading', {
        name: 'Product Summary',
      }),
    ).toBeInTheDocument()
  })

  it('renders calculated statistics', () => {
    render(
      <ProductSummary products={products} />,
    )

    expect(
      screen.getByText('Total Products'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Active Products'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Out of Stock'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Inventory Value'),
    ).toBeInTheDocument()

    expect(
      screen.getByText(/₹\s?2,000\.00/),
    ).toBeInTheDocument()
  })

  it('renders zero inventory value for an empty collection', () => {
    render(<ProductSummary products={[]} />)

    expect(
      screen.getByText(/₹\s?0\.00/),
    ).toBeInTheDocument()
  })
})