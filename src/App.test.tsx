import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the ECOP application heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /enterprise commerce & operations portal/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the product catalog', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /product catalog/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders products from the catalog', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: 'MacBook Pro 14',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Sony WH-1000XM6',
      }),
    ).toBeInTheDocument()
  })
})