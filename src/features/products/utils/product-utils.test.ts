import { describe, expect, it } from 'vitest'

import type { Product } from '../model/product'
import {
  areAllProductsPriced,
  calculateInventoryValue,
  calculateProductStatistics,
  findProductById,
  getActiveProducts,
  getLowStockProducts,
  hasOutOfStockProducts,
  searchProducts,
  sortProductsByPrice,
  updateProductStock,
} from './product-utils'

const testProducts: Product[] = [
  {
    id: 'PRD-TEST-001',
    sku: 'MBP-TEST-001',
    name: 'MacBook Pro 14',
    price: 100,
    stockQuantity: 10,
    status: 'ACTIVE',
    category: 'ELECTRONICS',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'PRD-TEST-002',
    sku: 'SONY-TEST-002',
    name: 'Sony Headphones',
    price: 200,
    stockQuantity: 5,
    status: 'INACTIVE',
    category: 'ELECTRONICS',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'PRD-TEST-003',
    sku: 'BOOK-TEST-003',
    name: 'Clean Code',
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
  })
})

describe('getLowStockProducts', () => {
  it('returns products below the threshold', () => {
    const result = getLowStockProducts(
      testProducts,
      6,
    )

    expect(
      result.map((product) => product.id),
    ).toEqual([
      'PRD-TEST-002',
      'PRD-TEST-003',
    ])
  })

  it('includes a product equal to the threshold', () => {
    const result = getLowStockProducts(
      testProducts,
      5,
    )

    expect(
      result.some(
        (product) =>
          product.id === 'PRD-TEST-002',
      ),
    ).toBe(true)
  })

  it('returns an empty array when nothing matches', () => {
    const result = getLowStockProducts(
      testProducts,
      -1,
    )

    expect(result).toEqual([])
  })
})

describe('calculateInventoryValue', () => {
  it('calculates total inventory value', () => {
    const result =
      calculateInventoryValue(testProducts)

    expect(result).toBe(2000)
  })

  it('returns zero for an empty array', () => {
    expect(calculateInventoryValue([])).toBe(0)
  })
})

describe('findProductById', () => {
  it('returns the product for an existing ID', () => {
    const result = findProductById(
      testProducts,
      'PRD-TEST-002',
    )

    expect(result).toBeDefined()
    expect(result?.name).toBe('Sony Headphones')
  })

  it('returns undefined for an unknown ID', () => {
    const result = findProductById(
      testProducts,
      'UNKNOWN',
    )

    expect(result).toBeUndefined()
  })
})

describe('searchProducts', () => {
  it('searches products by name', () => {
    const result = searchProducts(
      testProducts,
      'MacBook',
    )

    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('PRD-TEST-001')
  })

  it('searches products by SKU', () => {
    const result = searchProducts(
      testProducts,
      'SONY-TEST',
    )

    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('PRD-TEST-002')
  })

  it('performs a case-insensitive search', () => {
    const result = searchProducts(
      testProducts,
      'clean code',
    )

    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('PRD-TEST-003')
  })

  it('ignores surrounding whitespace', () => {
    const result = searchProducts(
      testProducts,
      '   macbook   ',
    )

    expect(result).toHaveLength(1)
  })

  it('returns all products for a blank search', () => {
    const result = searchProducts(
      testProducts,
      '   ',
    )

    expect(result).toEqual(testProducts)
  })
})

describe('hasOutOfStockProducts', () => {
  it('returns true when an out-of-stock product exists', () => {
    expect(
      hasOutOfStockProducts(testProducts),
    ).toBe(true)
  })

  it('returns false when every product has stock', () => {
    const productsWithStock =
      testProducts.map((product) => ({
        ...product,
        stockQuantity: 10,
      }))

    expect(
      hasOutOfStockProducts(productsWithStock),
    ).toBe(false)
  })
})

describe('areAllProductsPriced', () => {
  it('returns true when all prices are greater than zero', () => {
    expect(
      areAllProductsPriced(testProducts),
    ).toBe(true)
  })

  it('returns false when a product has zero price', () => {
    const productsWithZeroPrice =
      testProducts.map((product, index) =>
        index === 0
          ? {
              ...product,
              price: 0,
            }
          : product,
      )

    expect(
      areAllProductsPriced(
        productsWithZeroPrice,
      ),
    ).toBe(false)
  })
})

describe('sortProductsByPrice', () => {
  it('sorts products by ascending price', () => {
    const result = sortProductsByPrice(
      testProducts,
      'ASC',
    )

    expect(
      result.map((product) => product.price),
    ).toEqual([50, 100, 200])
  })

  it('sorts products by descending price', () => {
    const result = sortProductsByPrice(
      testProducts,
      'DESC',
    )

    expect(
      result.map((product) => product.price),
    ).toEqual([200, 100, 50])
  })

  it('does not mutate the original array', () => {
    const originalOrder =
      testProducts.map((product) => product.id)

    const result = sortProductsByPrice(
      testProducts,
      'ASC',
    )

    expect(
      testProducts.map((product) => product.id),
    ).toEqual(originalOrder)

    expect(result).not.toBe(testProducts)
  })
})

describe('updateProductStock', () => {
  it('updates the correct product stock', () => {
    const result = updateProductStock(
      testProducts,
      'PRD-TEST-002',
      25,
    )

    const updatedProduct = findProductById(
      result,
      'PRD-TEST-002',
    )

    expect(updatedProduct?.stockQuantity).toBe(25)
  })

  it('does not change other products', () => {
    const result = updateProductStock(
      testProducts,
      'PRD-TEST-002',
      25,
    )

    expect(result[0]).toBe(testProducts[0])
    expect(result[2]).toBe(testProducts[2])
  })

  it('returns a new array', () => {
    const result = updateProductStock(
      testProducts,
      'PRD-TEST-002',
      25,
    )

    expect(result).not.toBe(testProducts)
  })

  it('creates a new object for the updated product', () => {
    const result = updateProductStock(
      testProducts,
      'PRD-TEST-002',
      25,
    )

    expect(result[1]).not.toBe(testProducts[1])
  })

  it('does not mutate the original product', () => {
    const originalProduct = testProducts[1]

    updateProductStock(
      testProducts,
      'PRD-TEST-002',
      25,
    )

    expect(originalProduct?.stockQuantity).toBe(5)
  })

  it('leaves product values unchanged for unknown ID', () => {
    const result = updateProductStock(
      testProducts,
      'UNKNOWN',
      25,
    )

    expect(result).toEqual(testProducts)
  })
})

describe('calculateProductStatistics', () => {
  it('calculates product statistics', () => {
    const result =
      calculateProductStatistics(testProducts)

    expect(result).toEqual({
      totalProducts: 3,
      activeProducts: 1,
      outOfStockProducts: 1,
      totalInventoryValue: 2000,
    })
  })

  it('returns zero statistics for an empty array', () => {
    const result =
      calculateProductStatistics([])

    expect(result).toEqual({
      totalProducts: 0,
      activeProducts: 0,
      outOfStockProducts: 0,
      totalInventoryValue: 0,
    })
  })
})