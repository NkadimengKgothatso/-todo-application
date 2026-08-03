# Task Manager

A simple task management web app built with Next.js and SQLite. Tasks can be created, edited, sorted, and archived (never deleted). Overdue tasks are highlighted automatically based on due date and status.

## Requirements

- Node.js v20 or later (developed and tested on Node v22.23.2)

## Setup

```bash
npm install
```

## Running the app

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

The SQLite database is created automatically on first run at `data/tasks.db`.

## Running tests

```bash
npm test
```

Runs all tests in `tests/` using Node's built-in test runner (`node --test`). No additional test framework required.

## Features

- **Create Task** — title (required), description, due date, topic, status
- **Display Tasks** — active tasks shown on the home page, sortable by topic, status, or due date
- **Edit Task** — update any field on an existing task
- **Archive Task** — archived tasks are hidden from the active list but never deleted; viewable on a separate `/archived` page
- **Overdue Indicator** — tasks past their due date (and not marked Complete) are visually flagged; this is calculated at display time, not stored in the database

## Documentation

- [`docs/database.md`](docs/database.md) — database schema and design decisions
- [`docs/third-party.md`](docs/third-party.md) — third-party libraries used and why
