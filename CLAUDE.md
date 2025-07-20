---
description: Use Bun instead of Node.js, npm, pnpm, or vite.
globs: "*.ts, *.tsx, *.html, *.css, *.js, *.jsx, package.json"
alwaysApply: false
---

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Bun automatically loads .env, so don't use dotenv.

## APIs

- `Bun.serve()` supports WebSockets, HTTPS, and routes. Don't use `express`.
- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- `Bun.redis` for Redis. Don't use `ioredis`.
- `Bun.sql` for Postgres. Don't use `pg` or `postgres.js`.
- `WebSocket` is built-in. Don't use `ws`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa.

## Testing

Use `bun test` to run tests.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

### End-to-End Testing with Playwright

For E2E testing, use Playwright. The app includes admin credentials for testing authentication flows:

```bash
# Install Playwright if not already installed
bunx playwright install

# Run E2E tests
bunx playwright test
```

**Testing Authentication:**

- **URL**: http://localhost:3000/
- **Admin Email**: Use `ADMIN_EMAIL` from `.env.local` (emmajsadams@gmail.com)
- **Admin Password**: Use `ADMIN_PASSWORD` from `.env.local`
- After login, users should be redirected to the tasks page (`/tasks`)

Example Playwright test:

```ts
import { test, expect } from "@playwright/test";

test("admin login flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Fill login form
  await page.fill('input[type="email"]', process.env.ADMIN_EMAIL);
  await page.fill('input[type="password"]', process.env.ADMIN_PASSWORD);
  await page.click('button[type="submit"]');

  // Should redirect to tasks page
  await expect(page).toHaveURL("http://localhost:3000/tasks");
});
```

## Frontend

Use HTML imports with `Bun.serve()`. Don't use `vite`. HTML imports fully support React, CSS, Tailwind.

Server:

```ts#index.ts
import index from "./index.html"

Bun.serve({
  routes: {
    "/": index,
    "/api/users/:id": {
      GET: (req) => {
        return new Response(JSON.stringify({ id: req.params.id }));
      },
    },
  },
  // optional websocket support
  websocket: {
    open: (ws) => {
      ws.send("Hello, world!");
    },
    message: (ws, message) => {
      ws.send(message);
    },
    close: (ws) => {
      // handle close
    }
  },
  development: {
    hmr: true,
    console: true,
  }
})
```

HTML files can import .tsx, .jsx or .js files directly and Bun's bundler will transpile & bundle automatically. `<link>` tags can point to stylesheets and Bun's CSS bundler will bundle.

```html#index.html
<html>
  <body>
    <h1>Hello, world!</h1>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>
```

With the following `frontend.tsx`:

```tsx#frontend.tsx
import React from "react";

// import .css files directly and it works
import './index.css';

import { createRoot } from "react-dom/client";

const root = createRoot(document.body);

export default function Frontend() {
  return <h1>Hello, world!</h1>;
}

root.render(<Frontend />);
```

Then, run index.ts

```sh
bun --hot ./index.ts
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.md`.

## Development

To start the development server (runs both Next.js and Convex):

```bash
bun run dev
```

This will:

- Start Next.js dev server with Turbopack at http://localhost:3000/
- Start Convex dev server for real-time backend
- Show colored output for both services in the same terminal

Individual commands are also available:

- `bun run dev:next` - Next.js only
- `bun run dev:convex` - Convex only

## Code Quality & Pre-commit Hooks

The project uses Husky for pre-commit hooks that automatically run:

1. **Secret scanning** - Checks for API keys, tokens, and other secrets
2. **Linting** - ESLint with TypeScript and Prettier integration
3. **Type checking** - TypeScript compiler checks
4. **Tests** - Full test suite
5. **Build verification** - Ensures the project builds successfully

Available commands:

- `bun run lint` - Run ESLint
- `bun run lint:fix` - Auto-fix linting issues
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check code formatting
- `bun run type-check` - Run TypeScript compiler

Pre-commit hooks are automatically installed when running `bun install` via the `prepare` script.

## Git Workflow

Whenever you've done some logical unit of work, stage all changes, generate a useful summary, commit, then push.
