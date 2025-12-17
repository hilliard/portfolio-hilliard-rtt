import React from 'react'
import { render } from '@testing-library/react'
import Header from '../../components/layout/Header'
import { axe } from 'jest-axe'

describe('Header accessibility', () => {
  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Header />)
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
