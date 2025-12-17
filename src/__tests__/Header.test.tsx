import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../components/layout/Header'

describe('Header component', () => {
  it('renders logo link and nav toggle button', async () => {
    render(<Header />)

    const logoLink = screen.getByRole('link', { name: /logo/i })
    expect(logoLink).toBeInTheDocument()

    const toggleBtn = screen.getByRole('button', { name: /toggle navigation/i })
    expect(toggleBtn).toBeInTheDocument()

    // clicking toggle should change nav visibility via class; we can click and ensure nav links appear
    await userEvent.click(toggleBtn)

    const homeLink = screen.getByRole('link', { name: /Home/i })
    expect(homeLink).toBeInTheDocument()
  })

  it('opens nav on toggle and closes when a nav link is clicked', async () => {
    render(<Header />)

    const toggleBtn = screen.getByRole('button', { name: /toggle navigation/i })
    const nav = screen.getByRole('navigation')

    // initially closed
    expect(nav.className).toMatch(/translate-x-full/)

    // open
    await userEvent.click(toggleBtn)
    expect(nav.className).toMatch(/translate-x-0/)

    // clicking a nav link should close the nav
    const homeLink = screen.getByRole('link', { name: /Home/i })
    await userEvent.click(homeLink)
    expect(nav.className).toMatch(/translate-x-full/)
  })
})
