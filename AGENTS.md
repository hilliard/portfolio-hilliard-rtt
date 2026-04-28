# AGENTS.md

## Development Commands
- `npm run dev`: Start development server.
- `npm run build`: Build the project (generates `out/` for static export).
- `npm run lint`: Run ESLint.
- `npm run start`: Serve the `out/` directory locally.

## Testing
- Unit/a11y tests: `npm run test` (uses Vitest).
- E2E tests: `npm run build` followed by `npm run e2e` (uses Playwright).
- View E2E reports: `npm run e2e:report`.

## Project Structure & Architecture
- **App Router**: Uses `src/app/` for routes and layouts.
- **Components**: Reusable components located in `src/components/`.
- **Data-Driven**: Project data is managed in `src/data/portfolio.ts`.
- **Static Assets**: Located in `public/`.

## Important Files
- `src/data/portfolio.ts`: The single source of truth for portfolio projects.
- `playwright.config.ts`: Playwright configuration.
- `vitest.config.ts`: Vitest configuration.
