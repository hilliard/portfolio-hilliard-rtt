// Vitest setup: load jest-dom matchers and mock Next.js components that are
// not compatible with the jsdom/unit-test environment.

import '@testing-library/jest-dom'
import React, { forwardRef } from 'react'
import type { AnchorHTMLAttributes, ImgHTMLAttributes, PropsWithChildren } from 'react'
import { vi } from 'vitest'

// Mock next/image to render a standard <img> for unit tests
vi.mock('next/image', () => {
  const Img = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }>(
    ({ priority, ...props }, ref) => React.createElement('img', { ref, ...props })
  )
  return { default: Img }
})

// Mock next/link to render a standard <a> element
vi.mock('next/link', () => {
  const Link = forwardRef<HTMLAnchorElement, PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>>(
    ({ href, children, ...rest }, ref) => React.createElement('a', { ref, href, ...rest }, children)
  )
  return { default: Link }
})
