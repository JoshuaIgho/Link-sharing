# LinkShare

LinkShare is a modern link-in-bio and link-sharing web app — create a single public profile page that aggregates your links, social platforms, and analytics.

---

## Key features

- Public profile pages (linkshare.app/username)
- Unlimited links per profile
- Per-link scheduling, analytics (views, clicks, CTR)
- Mobile-first, responsive UI with Tailwind CSS
- Social platform icons + manual custom platforms
- Easy onboarding: register, add links, customize
- Simple server API and React client

---

## Tech stack

- Frontend: React 19, Tailwind CSS, lucide-react icons
- Backend: Node.js / Express (Server folder)
- Dev tools: npm, ESLint, Prettier
- Tested on macOS (developer instructions assume macOS)

---

## Repo structure

- /client — React app (frontend)
- /Server — Node/Express API (backend)
- /README.md — this file
- /.gitignore — common ignores (includes `.env*`)

---

## Prerequisites

- Node.js 18+ / npm
- Git

---

## Local setup

Clone repo and install dependencies:

```bash
git clone <repo-url>
cd "Link sharing project"
```

Install frontend and backend dependencies:

```bash
# client
cd client
npm install

# server
cd ../Server
npm install
```

Create environment files from examples:

```bash
# create .env in client and server from .env.example
cp client/.env.example client/.env
cp Server/.env.example Server/.env
```

Note: .env files are ignored by git (see `.gitignore`). If any `.env` files were previously tracked, run:
```bash
git rm --cached Server/.env client/.env
git commit -m "chore: stop tracking .env files"
```

---

## Running in development

Start backend and frontend (from repo root or separate terminals):

```bash
# server
cd Server
npm run dev

# client
cd ../client
npm run dev
```

Open http://localhost:3000 (or the port shown by your dev server).

---

## Build & deploy

Build the client:

```bash
cd client
npm run build
```

Serve the build using your preferred static host. Backend build/production steps depend on your deployment target (e.g., Heroku, DigitalOcean, Docker).

---

## Important implementation notes & troubleshooting

- React 19 compatibility:
  - Some libraries (e.g., `react-helmet-async` older versions) might not list React 19 in peer deps. You can either:
    - Use a local Head component that manipulates document.title/meta (implemented under `client/src/pages/Head.jsx`) to avoid installing `react-helmet-async`, or
    - Install with `--legacy-peer-deps` if you accept ignoring peer constraints:
      `npm install react-helmet-async --legacy-peer-deps`

- Mobile menu clipping:
  - If a fixed mobile menu is nested inside an element with `backdrop-filter`, `filter`, or `transform`, the browser may clip fixed children. The app uses a portal (render to `document.body`) for the mobile menu to avoid clipping.

- Social platforms:
  - There is a small curated platform list with matching rules and icons. Users can add custom platforms when not found.

---

## Tests & linting

- Run tests (if present):
  ```bash
  cd client
  npm test
  ```
- Lint:
  ```bash
  cd client
  npm run lint
  ```

---

## Contributing

- Fork the repo and open a PR with focused changes.
- Follow existing code style (Tailwind utility classes, functional components).
- Suggested commit message for bulk cleanup:
  ```
  chore: cleanup & fixes — ignore .env, fix header mobile menu, replace react-helmet-async
  ```

---

## License

Specify your license here (e.g., MIT). Add `LICENSE` file in repo root.

---

If you'd like, I can:
- Add a production-ready `README` badge section (deploy, CI),
- Create `.env.example` files for client & server,
- Add more platform icons or implement react-hook-form integration for the link form.
