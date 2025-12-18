import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    css: false,
    // Only run our project tests
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // Exclude common folders and E2E specs
    exclude: [
      'node_modules/**',
      'dist/**',
      '.next/**',
      'out/**',
      'coverage/**',
      '.git/**',
      'e2e/**',
    ],
    // Avoid watching noisy folders
    watchExclude: [
      'node_modules/**',
      'dist/**',
      '.next/**',
      'out/**',
      'coverage/**',
      '.git/**',
      'e2e/**',
    ],
  },
})
