import { describe, it, expect } from 'vitest'
import { workItems } from '../data/portfolio'

describe('portfolio data', () => {
  it('exports an array of work items', () => {
    expect(Array.isArray(workItems)).toBe(true)
    expect(workItems.length).toBeGreaterThan(0)
  })

  it('each item has required fields', () => {
    for (const item of workItems) {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('title')
      expect(item).toHaveProperty('slug')
      expect(item).toHaveProperty('link')
      expect(item).toHaveProperty('image')
    }
  })
})
