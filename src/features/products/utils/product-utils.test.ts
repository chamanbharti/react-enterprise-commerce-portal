import { describe, expect, it } from 'vitest'

import type { Product } from '../model/products'
import {
  calculateInventoryValue,
  getActiveProducts,
  getLowStockProducts,
} from './product-utils'

const testProducts: Product[] = [
  {
    id: 'PRD-TEST-001',
    sku: 'TEST-001',
    name: 'Active Product',
    price: 100,
    stockQuantity: 10,
    status: 'ACTIVE',
    category: 'ELECTRONICS',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'PRD-TEST-002',
    sku: 'TEST-002',
    name: 'Inactive Product',
    price: 200,
    stockQuantity: 5,
    status: 'INACTIVE',
    category: 'HOME',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'PRD-TEST-003',
    sku: 'TEST-003',
    name: 'Discontinued Product',
    price: 50,
    stockQuantity: 0,
    status: 'DISCONTINUED',
    category: 'BOOKS',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
]

describe('getActiveProducts', () => {
  it('returns only active products', () => {
    const result = getActiveProducts(testProducts)

    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('PRD-TEST-001')
    expect(result[0]?.status).toBe('ACTIVE')
  })

  it('excludes inactive and discontinued products', () => {
    const result = getActiveProducts(testProducts)

    expect(
      result.some((product) => product.status === 'INACTIVE'),
    ).toBe(false)

    expect(
      result.some(
        (product) => product.status === 'DISCONTINUED',
      ),
    ).toBe(false)
  })
})

describe('getLowStockProducts', () => {
  it('returns products below the threshold', () => {
    const result = getLowStockProducts(testProducts, 6)

    expect(result.map((product) => product.id)).toEqual([
      'PRD-TEST-002',
      'PRD-TEST-003',
    ])
  })

  it('includes products exactly equal to the threshold', () => {
    const result = getLowStockProducts(testProducts, 5)

    expect(
      result.some(
        (product) => product.id === 'PRD-TEST-002',
      ),
    ).toBe(true)
  })

  it('returns an empty array when no products match', () => {
    const result = getLowStockProducts(testProducts, -1)

    expect(result).toEqual([])
  })
})

describe('calculateInventoryValue', () => {
  it('calculates total inventory value', () => {
    const result = calculateInventoryValue(testProducts)

    expect(result).toBe(2000)
  })

  it('returns zero for an empty product collection', () => {
    const result = calculateInventoryValue([])

    expect(result).toBe(0)
  })
})