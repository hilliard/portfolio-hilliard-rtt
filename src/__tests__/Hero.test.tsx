import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '../components/sections/Hero'

describe('Hero component', () => {
  it('renders heading and subtitle and image', () => {
    render(<Hero />)

    const heading = screen.getByRole('heading', { name: /Hello, I am/i })
    expect(heading).toBeInTheDocument()

    const subtitle = screen.getByText(/Problem Solver/i)
    expect(subtitle).toBeInTheDocument()

    const img = screen.getByAltText(/a picture of Hilliard Scott/i)
    expect(img).toBeInTheDocument()
  })
})
