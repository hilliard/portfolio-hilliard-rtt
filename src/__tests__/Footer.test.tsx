import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '../components/layout/Footer'
import { vi } from 'vitest'

// Mock next/navigation usePathname for footer to test conditional rendering
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Footer component', () => {
  it('renders contact email and social links', () => {
    render(<Footer />)

    const email = screen.getByText(/hilliards@gmail.com/i)
    expect(email).toBeInTheDocument()

    // social icons may not have accessible names; assert that at least one anchor to github exists
    const anchors = screen.getAllByRole('link')
    const hasGithub = anchors.some(a => a.getAttribute('href')?.includes('github'))
    expect(hasGithub).toBe(true)
  })
})
