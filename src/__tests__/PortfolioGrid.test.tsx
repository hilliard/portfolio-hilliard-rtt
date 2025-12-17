import React from 'react'
import { render, screen } from '@testing-library/react'
import PortfolioGrid from '../components/sections/PortfolioGrid'

const items = [
  { id: '1', title: 'One', image: '/img/one.jpg', link: '/portfolio/one' },
  { id: '2', title: 'Two', image: '/img/two.jpg', link: '/portfolio/two' },
]

describe('PortfolioGrid component', () => {
  it('renders title, subtitle and items', () => {
    render(<PortfolioGrid title="Work" subtitle="Selected" id="work" items={items} />)

    expect(screen.getByText(/Work/i)).toBeInTheDocument()
    expect(screen.getByText(/Selected/i)).toBeInTheDocument()

    // each item should render an image with alt text matching title
    for (const item of items) {
      const img = screen.getByAltText(item.title)
      expect(img).toBeInTheDocument()
    }

    const anchors = screen.getAllByRole('link')
    const hasFirst = anchors.some(a => a.getAttribute('href') === '/portfolio/one')
    const hasSecond = anchors.some(a => a.getAttribute('href') === '/portfolio/two')
    expect(hasFirst).toBe(true)
    expect(hasSecond).toBe(true)
  })

  it('renders items across different viewport sizes (responsive)', () => {
    // narrow viewport
    global.innerWidth = 320
    global.dispatchEvent(new Event('resize'))

    const { rerender } = render(
      <PortfolioGrid title="Work" subtitle="Selected" id="work" items={items} />
    )

    let anchors = screen.getAllByRole('link')
    expect(anchors.length).toBe(items.length)

    // simulate wider viewport
    global.innerWidth = 1200
    global.dispatchEvent(new Event('resize'))
    rerender(<PortfolioGrid title="Work" subtitle="Selected" id="work" items={items} />)

    anchors = screen.getAllByRole('link')
    expect(anchors.length).toBe(items.length)
  })
})
