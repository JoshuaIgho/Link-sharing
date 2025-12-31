# LinkShare

[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-blue)](#)
[![Deploy](https://img.shields.io/badge/Deploy-vercel-green)](#)

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
  - Some libraries (e.g., `react-helmet-async`) might not list React 19 in peer deps. To avoid conflicts, this project uses a tiny Head component that manipulates document.title/meta directly.
  - Or install packages ignoring peer constraints: `npm install <pkg> --legacy-peer-deps`.

- Mobile menu clipping:
  - Fixed menus can be clipped when nested under elements with `backdrop-filter`, `filter`, or `transform`. The app renders the mobile menu into document.body (portal) to avoid clipping.

- Social platforms:
  - Curated platform list with matching rules and icons; custom platforms allowed.

---

## Contributing

- Fork the repo and open a PR with focused changes.
- Follow existing code style (Tailwind utility classes, functional components).

---

## Environment files

Example env files are included:
- client/.env.example
- Server/.env.example

Copy and fill the values before running.

---

