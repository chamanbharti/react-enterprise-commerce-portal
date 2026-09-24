import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Product } from '../model/product'
import { ProductList } from './ProductList'

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
    sku: 'SONY-002',
    name: 'Sony Headphones',
    price: 34990,
    stockQuantity: 5,
    status: 'ACTIVE',
    category: 'ELECTRONICS',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
]

describe('ProductList', () => {
  it('renders multiple products', () => {
    render(<ProductList products={products} />)

    expect(
      screen.getByRole('heading', {
        name: 'MacBook Pro 14',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Sony Headphones',
      }),
    ).toBeInTheDocument()
  })

  it('renders an empty-state message when there are no products', () => {
    render(<ProductList products={[]} />)

    expect(
      screen.getByText('No products available.'),
    ).toBeInTheDocument()
  })

  it('does not render product headings when the list is empty', () => {
    render(<ProductList products={[]} />)

    expect(
      screen.queryByRole('heading', {
        level: 3,
      }),
    ).not.toBeInTheDocument()
  })
})