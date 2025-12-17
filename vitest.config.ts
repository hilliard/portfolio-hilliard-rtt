import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/setupTests.tsx'],
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
  },
})
