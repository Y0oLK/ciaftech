# CIAF Tech — Smart TV Media Player + Built-In VPN

Web storefront and technical knowledge base for **CIAF Player**, built with React 19, Vite, TypeScript, Tailwind CSS v4, and React Router.

## Local Development

```bash
npm install
npm run dev
```

## Typecheck & Production Build

```bash
npm run typecheck
npm run build
```

## Hosting on Cloudflare Pages (Free Plan)

1. Log in to the **Cloudflare Dashboard** → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select repository **`Y0oLK/ciaftech`** (`main` branch).
3. Use these build settings:
   - **Framework preset:** `Vite` (or `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**.

> SPA routing (`/uk`, `/ca`, `/products`, `/blog`, `/activate`, etc.) works automatically on Cloudflare Pages because no `404.html` overrides fallback routing to `index.html`.
