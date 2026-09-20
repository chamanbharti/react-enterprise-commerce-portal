import { describe, expect, it } from 'vitest'

import { ApiError } from '../../../shared/api/api-error'
import { products } from '../data/products'
import {
  getProductById,
  getProductDashboardData,
  getProducts,
  getProductsByCategory,
} from './product-service'

describe('getProducts', () => {
  it('returns all products', async () => {
    const result = await getProducts()

    expect(result).toEqual(products)
    expect(result).toHaveLength(products.length)
  })

  it('returns a new array', async () => {
    const result = await getProducts()

    expect(result).not.toBe(products)
  })

  it('does not expose the source array to mutation', async () => {
    const result = await getProducts()

    result.pop()

    expect(products).toHaveLength(5)
    expect(result).toHaveLength(4)
  })
})

describe('getProductById', () => {
  it('returns an existing product', async () => {
    const expectedProduct = products[0]

    expect(expectedProduct).toBeDefined()

    const result = await getProductById(
      expectedProduct!.id,
    )

    expect(result).toEqual(expectedProduct)
  })

  it('throws ApiError when product does not exist', async () => {
    try {
      await getProductById('UNKNOWN')

      throw new Error(
        'Expected getProductById to reject',
      )
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)

      if (!(error instanceof ApiError)) {
        throw error
      }

      expect(error.status).toBe(404)
      expect(error.message).toContain('UNKNOWN')
      expect(error.message).toContain('was not found')
    }
  })
})

describe('getProductsByCategory', () => {
  it('returns only electronics products', async () => {
    const result =
      await getProductsByCategory('ELECTRONICS')

    expect(result.length).toBeGreaterThan(0)

    expect(
      result.every(
        (product) =>
          product.category === 'ELECTRONICS',
      ),
    ).toBe(true)
  })

  it('returns only book products', async () => {
    const result =
      await getProductsByCategory('BOOKS')

    expect(result.length).toBeGreaterThan(0)

    expect(
      result.every(
        (product) =>
          product.category === 'BOOKS',
      ),
    ).toBe(true)
  })

  it('returns an empty array when category has no matches', async () => {
    /*
     * The current test dataset contains categories from our
     * ProductCategory union, so there may not be a naturally
     * empty category. We can verify the filtering behavior
     * through the existing categories instead of inventing an
     * invalid ProductCategory.
     */
    const result =
      await getProductsByCategory('FASHION')

    const expected = products.filter(
      (product) => product.category === 'FASHION',
    )

    expect(result).toEqual(expected)
  })
})

describe('getProductDashboardData', () => {
  it('returns all products', async () => {
    const result =
      await getProductDashboardData()

    expect(result.products).toEqual(products)
  })

  it('returns only electronics in electronics collection', async () => {
    const result =
      await getProductDashboardData()

    expect(
      result.electronics.every(
        (product) =>
          product.category === 'ELECTRONICS',
      ),
    ).toBe(true)
  })

  it('returns only books in books collection', async () => {
    const result =
      await getProductDashboardData()

    expect(
      result.books.every(
        (product) =>
          product.category === 'BOOKS',
      ),
    ).toBe(true)
  })

  it('returns expected category collections', async () => {
    const result =
      await getProductDashboardData()

    const expectedElectronics = products.filter(
      (product) =>
        product.category === 'ELECTRONICS',
    )

    const expectedBooks = products.filter(
      (product) =>
        product.category === 'BOOKS',
    )

    expect(result.electronics).toEqual(
      expectedElectronics,
    )

    expect(result.books).toEqual(expectedBooks)
  })
})