import '@testing-library/jest-dom'

// Mock next/image for tests to render a plain img element
import { vi } from 'vitest'

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} className={className} />
  },
}))

// Provide a default mock for next/navigation; tests can override specific hooks as needed
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))
