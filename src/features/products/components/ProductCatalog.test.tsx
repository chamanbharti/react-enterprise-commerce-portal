import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Product } from '../model/product'
import { ProductCatalog } from './ProductCatalog'

const products: Product[] = [
  {
    id: 'PRD-001',
    sku: 'MBP-001',
    name: 'MacBook Pro 14',
    price: 169999,
    stockQuantity: 10,
    status: 'ACTIVE',
    category: 'ELECTRONICS',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'PRD-002',
    sku: 'BOOK-002',
    name: 'Clean Code',
    price: 2499,
    stockQuantity: 0,
    status: 'DISCONTINUED',
    category: 'BOOKS',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
]

describe('ProductCatalog', () => {
  it('renders the product catalog heading', () => {
    render(
      <ProductCatalog products={products} />,
    )

    expect(
      screen.getByRole('heading', {
        name: 'Product Catalog',
      }),
    ).toBeInTheDocument()
  })

  it('renders the product summary', () => {
    render(
      <ProductCatalog products={products} />,
    )

    expect(
      screen.getByRole('heading', {
        name: 'Product Summary',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Total Products'),
    ).toBeInTheDocument()
  })

  it('renders products', () => {
    render(
      <ProductCatalog products={products} />,
    )

    expect(
      screen.getByRole('heading', {
        name: 'MacBook Pro 14',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Clean Code',
      }),
    ).toBeInTheDocument()
  })

  it('renders the empty state when no products exist', () => {
    render(<ProductCatalog products={[]} />)

    expect(
      screen.getByText('No products available.'),
    ).toBeInTheDocument()
  })
})