import React from 'react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Define the expected props for the mocked Next.js Image component
interface MockImageProps {
  src: string | object; // src can sometimes be a static import object in Next.js
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

// Mock next/image for tests to render a plain img element
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: MockImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', { src, alt, width, height, className })
  },
}))

// Provide a default mock for next/navigation; tests can override specific hooks as needed
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))