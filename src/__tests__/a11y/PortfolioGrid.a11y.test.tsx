/// <reference types="vitest" />
import { describe, it, expect } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import PortfolioGrid from '../../components/sections/PortfolioGrid'
import { axe } from 'jest-axe'

const items = [
  { id: '1', title: 'One', image: '/img/one.jpg', link: '/portfolio/one' },
  { id: '2', title: 'Two', image: '/img/two.jpg', link: '/portfolio/two' },
]

describe('PortfolioGrid accessibility', () => {
  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <PortfolioGrid title="Work" subtitle="Selected" id="work" items={items} />
    )
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
