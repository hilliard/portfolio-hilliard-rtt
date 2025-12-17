# Portfolio - Hilliard M. Scott

This is a personal portfolio website built with Next.js and TypeScript. It showcases projects, a bio/about section, services, and a contact page. The site uses the `src` directory for app routes and components, and assets are stored in the `public` folder.

**Highlights**

- Modern Next.js app structure using the App Router (`src/app`).
- Components for layout, header/footer, and sections (`src/components`).
- A portfolio data file at `src/data/portfolio.ts` used to populate project pages.

**Tech Stack**

- Next.js
- TypeScript
- PostCSS

## Getting Started

Prerequisites:

- Node.js (16+ recommended)
- npm or yarn

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Build for production:

```bash
npm run build
# or
yarn build
```

Preview the production build (after `build`):

```bash
npm run start
# or
yarn start
```

Project structure (important files)

- `src/app/` — Next.js App Router pages and layout
- `src/components/` — Reusable components (`layout`, `sections`)
- `src/data/portfolio.ts` — Portfolio project data
- `public/` — Static assets (images, resume, etc.)

## Deployment

This project can be deployed to platforms that support Next.js (Vercel, Netlify, Cloud providers). For Vercel, simply connect the repository and let Vercel run the default `npm run build` step.

## Notes

- If you add environment variables, create a `.env.local` file and reference them in `next.config.js` or the app code as needed.
- The resume HTML file is in `public/resume/hilliard-m-scott-resume-2025.html` for static access.

Want me to do more?

- I can run the dev server locally, add CI scripts, or prepare a deployment configuration. Tell me which you prefer.

## CI Secrets & Deploy Setup

This repo's CI workflow (`.github/workflows/ci.yml`) includes optional deploy jobs that run when repository secrets are present. Below are the secrets the workflow expects and how to create them.

Vercel (recommended)

- Secrets used by workflow:
  - `VERCEL_TOKEN` — your Vercel personal token (required for CLI deploy).
  - `VERCEL_ORG_ID` — optional (the Vercel organization ID).
  - `VERCEL_PROJECT_ID` — optional (the Vercel project ID).

How to create (web UI):

- Go to https://vercel.com/account/tokens and create a new Personal Token. Copy the token value (looks like `vercel_abc123...`).

How to add to GitHub (web UI):

- Repository → Settings → Secrets and variables → Actions → New repository secret.
- Add `VERCEL_TOKEN` with the token value. Optionally add `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` if you want targeted deploys.

Example sample values (placeholders):

- `VERCEL_TOKEN=vercel_0123456789abcdef`
- `VERCEL_ORG_ID=org_0123456789abcdef`
- `VERCEL_PROJECT_ID=prj_0123456789abcdef`

Add via GitHub CLI (example):

```bash
echo "vercel_0123456789abcdef" | gh secret set VERCEL_TOKEN
echo "org_0123456789abcdef" | gh secret set VERCEL_ORG_ID
echo "prj_0123456789abcdef" | gh secret set VERCEL_PROJECT_ID
```

Notes: the workflow uses `npx vercel --prod --token $VERCEL_TOKEN --confirm`. If you prefer, you can set up Vercel's Git integration (recommended) and skip the token-based deploy in CI.

GitHub Pages (alternative)

- Secret used by workflow:
  - `GITHUB_PAGES` — any non-empty secret to enable the Pages deploy job (the workflow checks presence of this secret).

How to create (web UI):

- Repository → Settings → Secrets and variables → Actions → New repository secret → Name: `GITHUB_PAGES`, Value: `1` (or any non-empty string).

Add via GitHub CLI (example):

```bash
echo "1" | gh secret set GITHUB_PAGES
```

Important Pages notes:

- The workflow calls `npm run export` to produce a static `out/` folder. The Next.js App Router is not fully compatible with `next export`; if your site uses server-only features you cannot use `next export` successfully. If you want Pages deploys, ensure your site is exportable or convert pages to support static export.
- Add an `export` script if missing in `package.json`:

```json
"scripts": {
	"export": "next export"
}
```

Security and Best Practices

- Keep tokens secret — do not commit them to the repository.
- Prefer Vercel's Git integration for simple deployments; use token-based CLI deploys when you need fine-grained control from CI.
- For debugging, enable `Actions` logs in GitHub and restrict token permissions where possible.

Want me to add instructions to `README.md` with step-by-step screenshots or add the `export` script to `package.json`? I can make either change next.

## Vercel Git Integration

Quick steps to connect this repository to Vercel using the Git integration (recommended):

1. Sign in or create an account at https://vercel.com.
2. Click "New Project" → "Import Git Repository" and choose your Git provider (GitHub/GitLab/Bitbucket).
3. Select this repository from the list and click "Import".
4. In the Import settings set:
   - Framework Preset: `Next.js`
   - Root Directory: leave empty (unless your app is in a subfolder)
   - Build Command: `npm run build`
   - Output Directory: (leave blank — Vercel will detect `.next`)
5. Add Environment Variables (if any) in the Vercel Project Settings → Environment Variables.
6. Click "Deploy" — Vercel will build and deploy, and future pushes to `main` will trigger automatic deploys.

Notes:

- Vercel automatically handles Next.js builds and edge features; using the Git integration avoids storing deployment tokens in repo secrets.
- If you want to preview PR deployments, ensure the branch and preview settings are enabled in the Vercel project.

## Static export note

Recent Next.js versions (App Router) prefer using `output: 'export'` in `next.config.js` to produce a static `out/` folder during `next build`. The older `next export` CLI command is deprecated and may fail. This repo was updated so that `next build` creates the `out/` directory and the CI workflow uploads it for GitHub Pages; the `export` npm script was replaced with a harmless message to avoid running the deprecated command.
