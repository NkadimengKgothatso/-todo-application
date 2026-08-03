# Database Design

## Overview

The application uses a single SQLite database file (`data/tasks.db`) with **one table**: `tasks`. There are no foreign keys or relationships, since a single table fully satisfies the assignment's requirements and the app is single-user/local-first.

## Schema

```sql
CREATE TABLE tasks (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  description TEXT,
  dueDate     DATE,
  topic       TEXT,
  status      TEXT NOT NULL DEFAULT 'Todo' CHECK (status IN ('Todo', 'In-Progress', 'Complete')),
  archived    BOOLEAN NOT NULL DEFAULT 0,
  createdAt   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Column notes

| Column | Purpose |
|---|---|
| `id` | Auto-incrementing primary key |
| `title` | Required; cannot be blank (enforced in the API layer and `NOT NULL` at the DB level) |
| `description` | Optional free text |
| `dueDate` | Optional date; used to calculate overdue status |
| `topic` | Optional free text; used for sorting |
| `status` | Restricted to `Todo`, `In-Progress`, or `Complete` via a `CHECK` constraint — this is enforced at the database level, not just the UI, so invalid statuses cannot be inserted even by mistake |
| `archived` | Boolean flag (stored as `0`/`1`, SQLite has no native boolean type). Tasks are never deleted — archiving only sets this flag |
| `createdAt` / `updatedAt` | Timestamps, auto-managed by the application |

## Design decisions

- **No `overdue` column.** Overdue status is a derived property (`dueDate < today AND status != 'Complete'`), calculated at read/render time rather than stored. Storing it would risk it becoming stale (e.g. a task's overdue flag not updating the moment midnight passes).
- **No delete operations.** The assignment requires archiving, not deletion, so there is no `DELETE` statement anywhere in the codebase — only `archived = 1` updates.
- **No relationships / no additional tables.** The assignment only requires tracking tasks for a single implicit user, so a single flat table is sufficient. No `users` table or foreign keys were needed.
