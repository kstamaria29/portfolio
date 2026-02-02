# AGENTS.md — Portfolio Website

## Project goal

Build a fast, accessible, single-page React portfolio site with these sections:

- Hero
- About Me
- Projects
- Reviews / Testimonials
- Contact

Primary outcomes:

- Clean UI, responsive layout, good Lighthouse scores
- Easy to update content (projects/testimonials) without editing many components
- Deployed publicly (e.g., Vercel/Netlify/GitHub Pages)

## Tech stack (current)

- React: Vite
- Styling: Tailwind CSS (Vite plugin)
- Animations: Motion for React (motion)
- Form handling: Formspree

## Content model (source of truth)

Store portfolio content in one place so updates are easy:

- `src/content/profile.ts` (name, title, socials, bio)
- `src/content/projects.ts` (array of projects)
- `src/content/reviews.ts` (array of testimonials)
- `src/content/contact.ts` (email, links, form config)

Rules:

- Sections render from content files (avoid hardcoding repeated copy in components).
- Content structures should stay stable; prefer extending fields over rewiring UI.

## UI/UX requirements

- Mobile-first and responsive
- Keyboard navigable
- Clear section anchors with reliable scrolling behavior
- Navbar includes a theme toggle (light mode available)
- Prefer semantic HTML (`section`, `header`, `nav`, `main`, `footer`)
- Images optimized (use modern formats if possible)

## Theme + vibe

- Default theme: dark
- Provide a light mode toggle in the Navbar.
- Theme preference must persist between visits
- Ensure contrast and readability in both themes

- Visual vibe: playful but clean
  - Rounded cards, soft gradients, subtle glow accents
  - Micro-interactions only (hover/tap, gentle section entrances)
  - Never let effects reduce readability or overwhelm content

## Styling rules (Tailwind)

- Use Tailwind utility classes for nearly all styling.
- Keep global CSS minimal (base resets, fonts, a few custom utilities only).
- Prefer consistent spacing + typography scale across sections.
- Reuse common patterns (container widths, card styles, buttons) rather than reinventing per section.

## Animation rules (Motion)

- Use Motion for:
  - Section entrance animations
  - Hover/tap micro-interactions
  - Subtle background accents

- Avoid:
  - Parallax-by-default
  - Long-running or distracting motion
  - Animation that blocks reading, scrolling, or interaction

### Reduced motion accessibility (REQUIRED)

- Respect reduced motion preferences.
- Use Motion's `useReducedMotion` to reduce/disable movement (prefer opacity fades).
- Never autoplay “big motion” effects if reduced motion is enabled.

## Performance expectations

- Favor transform/opacity animations (avoid layout thrashing).
- Keep animations subtle and under ~700ms.
- Keep bundles lean; don’t add libraries without a clear benefit.

## Component structure (suggested)

- `src/components/sections/Hero.tsx`
- `src/components/sections/About.tsx`
- `src/components/sections/Projects.tsx`
- `src/components/sections/Reviews.tsx`
- `src/components/sections/Contact.tsx`
- `src/components/layout/*` (Navbar, Footer, Container, etc.)
- `src/components/ui/*` (Button, Card, Badge, etc.)

## Projects section requirements

- Projects are displayed as a responsive grid/list of **cards**.
- Each card shows at minimum: project name, short summary, key tech tags, and (optional) thumbnail.
- Clicking a card opens a **modal** with full project details:
  - Title
  - Full description
  - Image gallery (multiple images supported)
  - Links (e.g., live demo, GitHub repo, case study)
  - Tech stack
  - Optional: role/contribution, challenges/solutions, outcomes
- Modal must be:
  - Accessible (focus trapping, ESC closes, click-outside closes where appropriate)
  - Keyboard navigable (tab order, close button reachable, links accessible)
  - Screen-reader friendly (proper dialog semantics, labeled title)
  - Scroll-safe (long content scrolls inside modal without breaking page)
- Closing the modal returns focus to the originating card.

## Projects content fields (expected)

Each project entry should support:

- `id` (stable identifier)
- `title`
- `shortDescription` (card summary)
- `fullDescription` (modal body)
- `tags` / `techStack`
- `images` (array; supports multiple)
- `links` (array; labeled links like “Live Demo”, “GitHub”)
- Optional: `highlights`, `role`, `challenges`, `outcomes`, `date`

Rules:

- Cards and modals render entirely from `src/content/projects.*`
- Avoid hardcoding project-specific UI inside the Projects component

## Commands

(Agent: run these before calling work “done”)

- Install: `npm i`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Test: `npm test` (if applicable)

## Coding conventions

- TypeScript preferred (if TS is enabled)
- Small, focused components
- No duplicated hardcoded content across components—use `src/content/*`
- Keep styling consistent
- Prefer simple props over context for this small site

## Agent workflow rules

1. Work in small commits/diffs: one section or concern at a time.
2. Don’t introduce new libraries without a clear reason.
3. If you change UX or structure, explain what changed and why.
4. Don’t add secrets to the repo. If API keys are needed, use `.env` + `.gitignore`.
5. Before finishing a task: run build/lint (and tests if present) and fix errors.

- If adding an animation:
  1. implement reduced-motion behavior,
  2. confirm it doesn’t block reading/scrolling,
  3. keep it consistent with other sections.

## Documentation + MCP rules (IMPORTANT)

### Context7

- When you need _any_ library/framework documentation or APIs, **always consult Context7**.
- In your own prompts and reasoning, include: **“use context7”** to pull the latest docs.
- Always use Context7 when working with Next.js/React/Tailwind/Motion/Lucide.

### OpenAI developer documentation MCP server

If the task touches OpenAI/Codex/MCP:

- Use the OpenAI developer documentation MCP server.
- Prefer official docs over guesses.

(Agent reminder: Codex supports MCP servers and shares MCP configuration between CLI and IDE.)

## Definition of done

A change is “done” when:

- The feature works in the dev server
- No TypeScript/lint errors
- Layout is responsive across common breakpoints
- Accessibility basics checked (tab order, focus, labels)
- Theme toggle works (default dark, light option, preference persists)
- Content is editable via `src/content/*`
- Contact flow handles success and error states cleanly
- Projects cards render correctly and remain readable in both themes.
- Clicking a project opens a modal with correct content (title, description, images, links).
- Modal accessibility verified (keyboard navigation, focus return, ESC close).
- Modal works on mobile (scrolling, safe close targets, no overflow bugs).
