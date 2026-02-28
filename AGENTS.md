# AGENTS.md

## Cursor Cloud specific instructions

This is a **Vue3 Element Admin** frontend SPA (no backend). See `README.md` for full documentation.

### Quick reference

| Task | Command |
|------|---------|
| Dev server (mock API) | `npm start` |
| Dev server (real API) | `npm run dev` |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Preview build | `npm run serve` |

### Non-obvious notes

- The dev server runs on **port 3001** (configured in `vite.config.js`).
- Use `npm start` (mock mode) for development — it enables `vite-plugin-mock` so no external backend is needed.
- Mock login credentials: any username + password `123456` (see `mock/login.js`).
- The mock randomly assigns role `admin` or `visitor` on each login, which affects visible menu items.
- `npm run dev` (non-mock mode) proxies `/api` to a placeholder URL `http://dev.api.xxx.com`; it will not work without a real backend.
- ESLint is configured with `babel-eslint` parser (v6 era); `npm run lint` produces warnings but zero errors on the existing codebase.
- Husky v1 + lint-staged are configured in `package.json` (pre-commit hook runs lint on staged `.js`/`.vue` files in `src/`).
