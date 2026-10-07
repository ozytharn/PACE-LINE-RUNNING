# Paceline Running — Frontend Demo

A responsive storefront prototype based on the supplied DCS Web Cluster design. It includes the Home and About pages, locally implemented shopping interactions, and the provided design imagery.

## Live production site

- Home: <https://paceline-running-frontend.vercel.app/>
- About: <https://paceline-running-frontend.vercel.app/about>

> This is a front-end-only demo. Product details are sample content; there is no inventory service, account system, order processing, payment, or newsletter backend. The shopping bag, search, filters, and wishlist run in the browser only. The newsletter form validates input but does not send or store email addresses.
>
> The design brief does not provide a Paceline support address, so contact actions use the Web Cluster email supplied in the brief.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

In Windows PowerShell, use `npm.cmd install` and `npm.cmd run dev` if your
execution policy blocks the `npm.ps1` wrapper.

Open the local address printed by Vite (normally <http://127.0.0.1:5173/>).

## Pages

- `/` — Home and storefront
- `/about` — Our Story, principles, timeline, store map, founders, and contact actions

## Frontend features

- Responsive desktop, tablet, and mobile layouts.
- Working Home/About navigation, category links, mobile navigation, and accessible modal dialogs.
- A three-slide, manually controlled hero carousel with labelled, keyboard-accessible controls.
- Product filters for new arrivals, best sellers, race day, trail, and product categories.
- Search across the local product catalogue.
- In-memory wishlist and shopping bag with quantity editing, removal, and subtotal calculation.
- Browser-native email validation and an honest demo-only newsletter confirmation.
- Contact and gait-analysis actions open a pre-addressed email; the map opens a Glasgow-area map search.
- Keyboard-visible focus, skip-to-content link, semantic landmarks and headings, announced status updates, modal focus handling, and reduced-motion support.
- Supplied imagery converted to WebP. Below-the-fold images load lazily; the hero image is prioritized.

## Checks

```sh
npm run build
npm run lint
```

Use `npm.cmd run build` and `npm.cmd run lint` in Windows PowerShell when needed.
The build runs the TypeScript project checks before creating the optimized Vite output in `dist/`. The local development server is configured to bind to IPv4 loopback (`127.0.0.1`).

## Deploy to Vercel

1. Install Node.js, then sign in to Vercel CLI in your own terminal:

   ```sh
   npx vercel login
   ```

2. From the project directory, deploy the production build:

   ```sh
   npm run deploy
   ```

   In Windows PowerShell, use `npm.cmd run deploy` if the `npm.ps1` wrapper is
   blocked by the execution policy.

3. The project is named `paceline-running-frontend`. On first deployment,
Vercel may still ask you to confirm its project setup. The CLI prints the
public deployment URL when the deployment finishes.

Vercel builds with `npm run build`, serves `dist/`, and uses `vercel.json` to
send application routes such as `/about` to the client app. Do not commit or
share Vercel authentication tokens.

## Project structure

- `src/App.tsx` — route selection and shared cart, overlay, and announcement state.
- `src/data/catalog.ts` — typed sample product, category, and filter data.
- `src/components/StoreChrome.tsx` — responsive header, footer, and accessible search/account/cart/menu dialogs.
- `src/pages/HomePage.tsx` — Home page sections, catalogue filters, and wishlist controls.
- `src/pages/AboutPage.tsx` — About page content and contact/store sections.
- `src/index.css` — design tokens, responsive breakpoints, focus treatment, and reduced-motion rules.
- `public/assets/` — optimized WebP images supplied with the design.
- `index.html` — document title, metadata, and app entry point.
- `public/robots.txt` and `public/llms.txt` — crawler guidance for search engines and AI clients.
- `vercel.json` — Vercel build/output settings and client-side route fallback.
