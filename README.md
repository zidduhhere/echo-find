# Team - Hyphen

# EcoFinds

EcoFinds is a sustainable marketplace web app built with React, TypeScript, Vite, and Tailwind CSS. It showcases an eco‑friendly catalog with categories, product details, cart, checkout history, and authentication backed by Supabase.

Developed by Team Hyphen.

## Features

- Product catalog: browse products with responsive cards and loading skeletons
- Categories: dedicated pages for Electronics, Clothing, Home & Garden, Books, Sports & Recreation, and Art & Craftsa
- Product details: deep link via `/product/:id`
- Search and filters: client-side product listing and sort options
- Cart and orders: add to cart and view purchase history
- Auth: login and register pages with route guarding
- Dashboard: manage your listings with create/edit product forms
- Demo data: local `demo_products` for quick start without a backend

## Tech Stack

- React 18 + TypeScript
- Vite 5 (Dev/Build/Preview)
- Tailwind CSS 3
- React Router DOM 7
- Supabase JS SDK 2
- ESLint (TypeScript + React hooks + React Refresh)

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+

### Install

```
npm install
```

### Environment

Create a `.env` file in the project root and set the Supabase variables (required by `src/lib/supabase.ts`). For local demo-only usage, you can stick to the demo products and avoid calling Supabase-backed paths, but the variables are still validated on import.

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Tip: If you want to run without Supabase during UI exploration, temporarily point components to demo data only or guard imports to `supabase` as needed.

### Run Dev Server

```
npm run dev
```

The app runs with Vite and is typically available at `http://localhost:5173/`.

### Build

```
npm run build
```

### Preview Production Build

```
npm run preview
```

## Project Structure (high level)

- `src/App.tsx`: App shell, router mounting, providers
- `src/config/routes.tsx`: Centralized routes and groups
- `src/components/…`: UI components (products, layout, routing guards, etc.)
- `src/pages/…`: Page-level views (home, category, product, cart, auth, dashboard)
- `src/context/…`: App contexts (Auth, Cart) and `demo_products`
- `src/lib/supabase.ts`: Supabase client and DB types
- `tailwind.config.js`: Tailwind setup
- `vite.config.ts`: Vite config

## Notable Routes

- `/` Home
- `/login`, `/register` Auth
- `/product/:id` Product details
- `/cart` Cart
- `/orders` Purchase history
- `/dashboard` Dashboard (protected)
- `/create-product`, `/edit-product/:id` Product management (protected)
- `/categories` and specific category pages

## Development Notes

- Route guarding is handled via `RouteGuard` and route metadata (`requiresAuth`, `requiresGuest`).
- Navbar visibility is controlled based on pathname (hidden on `/login` and `/register`).
- Product listing currently uses `demo_products` for a fast, backend‑free experience; Supabase integration is scaffolded for real data.

## Contributing

- Follow existing code style and patterns.
- Keep changes minimal and focused.
- Run `npm run lint` before opening a PR.

## License

This project is provided as-is for demonstration and educational purposes.

## Credits

Developed by Team Hyphen.

## video link

LINK - https://drive.google.com/file/d/1-tQFUtIs9oUSRBAC1ZhkCzaiUmWEN-XU/view?usp=share_link
