## Portfolio (Vite + React + Tailwind + Motion)

### Setup

- Install: `npm i`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`

### AI chatbot (About section)

- Context + bot copy: `src/content/ai.ts`
- Server route: `api/chat.ts` (expects `OPENAI_API_KEY`, optional `OPENAI_MODEL`)
- Local dev: `vite.config.ts` mounts `/api/chat` during `npm run dev` (same env vars)

### Content editing (single source of truth)

- Profile: `src/content/profile.ts`
- Projects: `src/content/projects.ts`
- Reviews: `src/content/reviews.ts`
- Contact: `src/content/contact.ts`

### Notes

- Theme toggle persists via `localStorage` (default: dark).
- Projects open an accessible modal (ESC closes, click-outside closes, focus returns).
