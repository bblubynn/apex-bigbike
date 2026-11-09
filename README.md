# APEX BIGBIKE

Thai motorcycle catalog built with HTML, CSS, and JavaScript. Responsive layouts, search, brand/category/budget filters, sorting, local favorites, accessible detail dialogs, and a monthly savings planner.

## Run

Requires Node.js 20 or newer. No dependencies to install.

```sh
npm run dev
```

Open http://127.0.0.1:3000.

## Build and deploy

```sh
npm run build
```

Import this repository into Vercel. Framework: Other. Build command: `npm run build`. Output directory: `dist`. Configuration is included in `vercel.json`. No environment variables required.

Alternatively, from an authenticated Vercel CLI:

```sh
vercel --prod
```

## Content

All inventory entries, specifications, mileage, and prices are illustrative demonstration data, not verified listings or manufacturer specifications. Unsplash photographs are illustrative and may not depict the named models. External Google Fonts and Unsplash require network access. Replace demo entries with actual authorized listings before operating a dealership website.

Favorites are stored only in each browser. This version has no backend, real inventory management, contact submission, booking, payment, or customer account system. The planner divides a savings goal across months; it does not offer credit or quote finance rates.
