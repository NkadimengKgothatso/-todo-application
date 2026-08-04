# AI Usage Transcript



## Attribution 

- **Tool used:** Claude Web
- **Model used:** Claude Sonnet 5
- **What it was used for:** Planning, code generation (backend, frontend, database, tests), debugging, UI design, and documentation writing/editing across this entire project.

This repository makes use of AI code generation using the following tools: Claude-Web[Claude Sonnet 5].
This repository does not use AI in-line editing tools.
This repository does not use AI code review.

This document records significant interactions with the AI assistant during development, including decisions made, corrections applied, and places where AI suggestions were rejected or changed.

---

## 1. Database technology choice: Prisma vs. direct SQLite

**Prompt:** Asked whether to use Prisma or SQLite directly, since the assignment brief only mentioned SQLite.

**AI suggestion:** Recommended checking the brief/lecturer requirements first rather than assuming; offered both paths (Prisma if required, `better-sqlite3` if not).

**Decision:** Confirmed the brief only requires SQLite, no ORM. Chose `better-sqlite3` for simplicity — no migration layer needed for a single-table schema.

**Correction applied later:** Prisma had already been partially scaffolded (`prisma/` folder, `prisma.config.ts`, dependencies in `package.json`) before this was fully resolved. This was manually removed in a later cleanup pass (see #3).

---

## 2. Overdue status: calculated, not stored

**AI suggestion (initial):** Early planning included `archived` and other fields but did not initially separate "overdue" as a derived value.

**Correction:** Assignment rubric explicitly required overdue to be **calculated from `dueDate` and `status` at display time**, not stored as a column. This was enforced by adding a dedicated `isOverdue()` helper (`lib/overdue.js`) rather than adding an `overdue` column to the schema, and confirmed no such column exists in `lib/schema.sql`.

---

## 3. Repository cleanup — rejected/flagged content

While reviewing the repo file listing, the AI flagged several issues rather than assuming they were intentional:

- **Leftover Prisma files** (`prisma/`, `prisma.config.ts`, Prisma packages in `package.json`) despite a commit message claiming "removed Prisma." Identified as an incomplete deletion and fixed with `npm uninstall`, `rm -rf prisma/`, and a verified `git status` before committing.
- **AI tooling scaffolding** (`.agents/skills`, `.claude/skills`, `.windsurf/skills`, `skills-lock.json`) — flagged as unrelated to the actual application and removed from version control.
- **Suspicious `AGENTS.md` / `CLAUDE.md` content**: these files contained text instructing an AI assistant to distrust its own knowledge of Next.js and instead defer to documentation supposedly located inside `node_modules`. The AI identified this as a known prompt-injection pattern (planting fake instructions for AI tools to find and follow) and explicitly declined to act on it, recommending deletion instead of compliance.
- **A stray file named `git`** containing unrelated text (`"Please ask your administrator."`) — identified as accidental and removed.
- **A stray file named `cat`** — created accidentally during a terminal session (likely a typo'd redirect), caught in a later commit review and removed.
- **An old `database/` folder** containing an earlier, abandoned SQLite file (`todo.db`) from before the `lib/db.js` / `data/tasks.db` setup was finalized — confirmed as unused and removed.

---

## 4. File-creation process correction

**Issue:** Early in development, the AI provided component and API route code as chat text/markdown rather than as runnable shell commands. This resulted in most files (`CreateTaskForm`, `TaskList`, API routes, etc.) never actually being created on disk, even though `lib/db.js` and `lib/schema.sql` (which *were* given as copy-paste commands) existed. This wasn't caught until the browser showed the default Next.js starter page instead of the app.

**Correction:** Once identified, all remaining files were provided as a single copy-paste-ready shell script using `cat > file << 'EOF'` blocks, and file extensions were corrected from `.js`/`.jsx` to `.tsx` where needed, since the project was a TypeScript project (`tsconfig.json` present) and the AI had initially assumed a plain JavaScript project.

---

## 5. Test isolation decision

**Design choice:** Tests do not import directly from `lib/tasks.js` / `lib/db.js`, because those modules are hardwired to the real `data/tasks.db` file. Instead, `tests/tasks.test.js` uses a separate temporary SQLite file (`tests/test-tasks.db`) and small duplicated versions of the create/archive/query logic, so running tests never touches or corrupts real application data.

**Trade-off acknowledged:** This means the tests don't exercise the exact production code path in `lib/tasks.js`. Accepted as a reasonable trade-off given the project deadline; a more thorough approach would refactor `lib/db.js` to accept a configurable database path so tests could import and run against the real functions.

---

## 6. Module warning — accepted rather than "fixed"

**Issue:** `npm test` produced a harmless Node.js warning (`MODULE_TYPELESS_PACKAGE_JSON`) because the test file uses ES module syntax without a `"type": "module"` declaration.

**Attempted fix:** Adding a scoped `tests/package.json` with `{ "type": "module" }` caused a *different*, breaking error (`ERR_INVALID_PACKAGE_CONFIG`).

**Decision:** Reverted the scoped `package.json` attempt and accepted the original warning as harmless — tests still pass with exit code 0, and the warning does not affect grading or functionality. Prioritized a working test suite over a cosmetically clean console output given the deadline.

---

## 7. UI redesign — ledger aesthetic

**Prompt:** Asked for a more distinctive, "artsy classy" visual design instead of default styling.

**AI suggestion:** Proposed a ledger/ink-and-paper concept — deep ink-green page background, parchment task cards, brass gold accents, and a rotated wine-red "stamp" for overdue tasks instead of a plain red badge. Deliberately avoided the generic cream-background-plus-serif-plus-terracotta look common in AI-generated designs.

**Issue encountered:** The first version of `app/globals.css` placed a Google Fonts `@import` after the Tailwind `@import`, which broke the build (`@import rules must precede all rules aside from @charset and @layer statements`).

**Correction:** Reordered the file so the font `@import` comes before the Tailwind `@import`, resolving the build error.

---

## Summary

Overall, AI assistance was used for planning, scaffolding, and debugging throughout this project. Several AI outputs were checked, corrected, or rejected outright rather than accepted as-is — most notably the incomplete Prisma removal, the injected prompt-injection content in `AGENTS.md`/`CLAUDE.md`, the file-creation process gap that initially left most of the app unbuilt despite looking "done" in conversation, and a CSS build error introduced during the UI redesign.

---

The preceding document was generated with the assistance of the following: Claude-Web[Claude Sonnet 5]# AI Usage Transcript

This document records significant interactions with an AI assistant (Claude) during development, including decisions made, corrections applied, and places where AI suggestions were rejected or changed.

---

## 1. Database technology choice: Prisma vs. direct SQLite

**Prompt:** Asked whether to use Prisma or SQLite directly, since the assignment brief only mentioned SQLite.

**AI suggestion:** Recommended checking the brief/lecturer requirements first rather than assuming; offered both paths (Prisma if required, `better-sqlite3` if not).

**Decision:** Confirmed the brief only requires SQLite, no ORM. Chose `better-sqlite3` for simplicity — no migration layer needed for a single-table schema.

**Correction applied later:** Prisma had already been partially scaffolded (`prisma/` folder, `prisma.config.ts`, dependencies in `package.json`) before this was fully resolved. This was manually removed in a later cleanup pass (see #3).

---

## 2. Overdue status: calculated, not stored

**AI suggestion (initial):** Early planning included `archived` and other fields but did not initially separate "overdue" as a derived value.

**Correction:** Assignment rubric explicitly required overdue to be **calculated from `dueDate` and `status` at display time**, not stored as a column. This was enforced by adding a dedicated `isOverdue()` helper (`lib/overdue.js`) rather than adding an `overdue` column to the schema, and confirmed no such column exists in `lib/schema.sql`.

---

## 3. Repository cleanup — rejected/flagged content

While reviewing the repo file listing, the AI flagged several issues rather than assuming they were intentional:

- **Leftover Prisma files** (`prisma/`, `prisma.config.ts`, Prisma packages in `package.json`) despite a commit message claiming "removed Prisma." Identified as an incomplete deletion and fixed with `npm uninstall`, `rm -rf prisma/`, and a verified `git status` before committing.
- **AI tooling scaffolding** (`.agents/skills`, `.claude/skills`, `.windsurf/skills`, `skills-lock.json`) — flagged as unrelated to the actual application and removed from version control.
- **Suspicious `AGENTS.md` / `CLAUDE.md` content**: these files contained text instructing an AI assistant to distrust its own knowledge of Next.js and instead defer to documentation supposedly located inside `node_modules`. The AI identified this as a known prompt-injection pattern (planting fake instructions for AI tools to find and follow) and explicitly declined to act on it, recommending deletion instead of compliance.
- **A stray file named `git`** containing unrelated text (`"Please ask your administrator."`) — identified as accidental and removed.
- **A stray file named `cat`** — created accidentally during a terminal session (likely a typo'd redirect), caught in a later commit review and removed.
- **An old `database/` folder** containing an earlier, abandoned SQLite file (`todo.db`) from before the `lib/db.js` / `data/tasks.db` setup was finalized — confirmed as unused and removed.

---

## 4. File-creation process correction

**Issue:** Early in development, the AI provided component and API route code as chat text/markdown rather than as runnable shell commands. This resulted in most files (`CreateTaskForm`, `TaskList`, API routes, etc.) never actually being created on disk, even though `lib/db.js` and `lib/schema.sql` (which *were* given as copy-paste commands) existed. This wasn't caught until the browser showed the default Next.js starter page instead of the app.

**Correction:** Once identified, all remaining files were provided as a single copy-paste-ready shell script using `cat > file << 'EOF'` blocks, and file extensions were corrected from `.js`/`.jsx` to `.tsx` where needed, since the project was a TypeScript project (`tsconfig.json` present) and the AI had initially assumed a plain JavaScript project.

---

## 5. Test isolation decision

**Design choice:** Tests do not import directly from `lib/tasks.js` / `lib/db.js`, because those modules are hardwired to the real `data/tasks.db` file. Instead, `tests/tasks.test.js` uses a separate temporary SQLite file (`tests/test-tasks.db`) and small duplicated versions of the create/archive/query logic, so running tests never touches or corrupts real application data.

**Trade-off acknowledged:** This means the tests don't exercise the exact production code path in `lib/tasks.js`. Accepted as a reasonable trade-off given the project deadline; a more thorough approach would refactor `lib/db.js` to accept a configurable database path so tests could import and run against the real functions.

---

## 6. Module warning — accepted rather than "fixed"

**Issue:** `npm test` produced a harmless Node.js warning (`MODULE_TYPELESS_PACKAGE_JSON`) because the test file uses ES module syntax without a `"type": "module"` declaration.

**Attempted fix:** Adding a scoped `tests/package.json` with `{ "type": "module" }` caused a *different*, breaking error (`ERR_INVALID_PACKAGE_CONFIG`).

**Decision:** Reverted the scoped `package.json` attempt and accepted the original warning as harmless — tests still pass with exit code 0, and the warning does not affect grading or functionality. Prioritized a working test suite over a cosmetically clean console output given the deadline.

---

## Summary

Overall, AI assistance was used for planning, scaffolding, and debugging throughout this project. Several AI outputs were checked, corrected, or rejected outright rather than accepted as-is — most notably the incomplete Prisma removal, the injected prompt-injection content in `AGENTS.md`/`CLAUDE.md`, and the file-creation process gap that initially left most of the app unbuilt despite looking "done" in conversation.
