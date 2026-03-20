# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Planning

- Enter plan mode for any non-trivial task (3+ steps or architectural decisions)
- Write detailed specs upfront before implementation to reduce ambiguity
- Plan is written to `tasks/todo.md` with checkable items — check in with user before starting implementation
- If something goes sideways mid-task, stop and re-plan; don't keep pushing
- Use plan mode for verification steps, not just building

## Subagent Strategy

- Use subagents liberally to keep the main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One focused task per subagent

## Self-Improvement

- After any correction from the user: update `tasks/lessons.md` with the pattern and a rule to prevent recurrence
- Review `tasks/lessons.md` at session start for relevant context
- Ruthlessly iterate on lessons until mistake rate drops

## Verification

- Never mark a task complete without proving it works
- Run tests, check logs, demonstrate correctness
- Diff behavior between main and changes when relevant
- Ask: "Would a staff engineer approve this?"

## Bug Fixing

- When given a bug report: fix it autonomously — point at logs, errors, failing tests and resolve them
- Find root causes; no temporary fixes

## Task Tracking

Track progress in `tasks/todo.md`:
1. Write plan with checkable items
2. Verify plan with user before implementing
3. Mark items complete as you go
4. Add a review section when done
5. Capture lessons in `tasks/lessons.md` after any corrections

## Core Principles

- **Simplicity first**: Make every change as simple as possible; impact minimal code
- **Minimal impact**: Only touch what's necessary; avoid introducing regressions
- **Elegance check**: For non-trivial changes, pause and ask "is there a more elegant way?" — skip for simple obvious fixes
- **No laziness**: Senior developer standards; find root causes

---

## Project: Austin O'Neill Personal Resume Site

### What It Is
A single-page interactive resume/portfolio for Austin O'Neill — controls technician and software developer for regulated cannabis facilities. Targets hiring managers and tech founders. Aesthetic: high-end dev portfolio meets minimalist SaaS landing page.

### Stack
- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS (keep bundle small; no large UI kits)
- **Runtime/Deploy**: Cloudflare Pages (static) + Cloudflare Workers (dynamic endpoints)
- **Config**: `wrangler.toml` for Cloudflare config; `functions/api/contact.ts` for form handler stub

### Repo Structure
```
/src          React source (components, pages, hooks)
/public       Static assets
/functions    Cloudflare Worker handlers (e.g., api/contact.ts)
wrangler.toml Cloudflare Pages/Workers config
```

### Design Direction
- Dark-on-light base; single accent color (teal/cannabis-green, used sparingly)
- Occasional dark panels for controls/simulation sections
- Rounded cards, soft shadows, clean section dividers
- Subtle motion: fade/slide on scroll entrance, hover states — always respect `prefers-reduced-motion`
- No loud animations or anything that hurts Lighthouse score

### Site Sections (in order)
1. **Hero** — name, title, CTAs (View Experience, Download Resume PDF), LinkedIn/GitHub icons, status pill
2. **Hybrid Profile** — two-column: narrative left, vertical pill list right (the "bridge" between controls and software)
3. **Experience Timeline** — vertical timeline with scroll animation; tag chips per role
4. **Skills & Stack** — grouped grid cards with icons (Languages, Tools, Practices, Controls & Automation, Domain Knowledge)
5. **Projects** — rich cards with hover states; CannTycoon (controls simulation) + Portfolio & Internal Tools
6. **Cannabis Domain & Compliance** — two-column bullets; Health Canada, CannTrack, cultivation lifecycle
7. **Education & Certifications** — compact cards; Durham College Advanced Diploma (Dean's Honor Roll), CCNA, AWS, CannSell
8. **Contact** — email + phone + LinkedIn/GitHub buttons + optional form POSTing to `/api/contact`

### Key Content Facts
- **Name**: Austin O'Neill
- **Email**: austinoneill55@gmail.com
- **Phone**: 226-700-6808
- **GitHub**: https://github.com/AustinONeill
- **Location**: Montréal, QC
- **Current role**: Controls & Automation Technician — MTL Cannabis (Abba Medix Corp), Oct 2025–Present
- **Previous**: IT Technician & Cultivation Support — MTL Cannabis, Pickering ON, Nov 2024–Oct 2025
- **Previous**: Cannabis Production Assistant — Indiva, London ON, Oct 2022–Nov 2023
- **Education**: Advanced Diploma, Computer Programming — Durham College, completed April 2025 (Dean's Honor Roll)

### Nav
Sticky top nav: name/role left, section links + "Download PDF Resume" button right.

### Contact Form
POST to `/api/contact` — Cloudflare Worker stub, no real email wiring needed.
