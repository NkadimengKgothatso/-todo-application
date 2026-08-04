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

## Project Structure

```
todo/
├── app/
│   ├── page.tsx                     # Home page — create + view active tasks
│   ├── globals.css                  # Design tokens, fonts, component styles
│   ├── layout.tsx                   # Root layout
│   ├── archived/
│   │   └── page.tsx                 # Archived tasks page
│   ├── api/
│   │   └── tasks/
│   │       ├── route.js             # GET (list + sort), POST (create)
│   │       ├── archived/
│   │       │   └── route.js         # GET archived tasks
│   │       └── [id]/
│   │           ├── route.js         # PATCH (edit)
│   │           └── archive/
│   │               └── route.js     # POST (archive)
│   └── components/
│       ├── CreateTaskForm.tsx
│       ├── EditTaskForm.tsx
│       ├── TaskList.tsx
│       ├── TaskCard.tsx
│       └── ArchivedTaskList.tsx
├── lib/
│   ├── db.js                        # SQLite connection singleton
│   ├── schema.sql                   # Table definition
│   ├── tasks.js                     # Data access functions
│   └── overdue.js                   # Overdue calculation helper
├── tests/
│   └── tasks.test.js                # Automated tests (node --test)
├── docs/
│   ├── database.md                  # Schema and design decisions
│   ├── third-party.md               # Library choices and rationale
│   └── ai-transcript.md             # AI usage record
├── data/                            # SQLite database file (gitignored)
├── README.md
└── package.json
```

## Documentation

- [`docs/database.md`](docs/database.md) — database schema and design decisions
- [`docs/third-party.md`](docs/third-party.md) — third-party libraries used and why
- [`docs/ai-transcript.md`](docs/ai-transcript.md) — AI usage record: decisions, corrections, and rejected suggestions
