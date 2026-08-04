# Third-Party Libraries

| Library | Why it was chosen |
|---|---|
| **Next.js** | React framework used for both the frontend (pages, components) and backend (API routes), avoiding the need for a separate backend server. |
| **better-sqlite3** | Synchronous, dependency-free SQLite driver for Node.js. Chosen over an ORM (e.g. Prisma) because the assignment only requires SQLite, and a single-table schema doesn't need migration tooling or an abstraction layer — direct SQL is simpler to write, test, and reason about for a project this size. |
| **Node's built-in test runner (`node --test`)** | Used for automated tests instead of an external framework like Jest or Vitest. Since Node v18+, `node:test` ships built in, so no extra dependency is required, and `npm test` runs all tests with a single command as required by the assignment. |

## Note on an earlier decision

Prisma was initially scaffolded early in the project but removed once it was confirmed the assignment brief only required SQLite, not an ORM specifically. Removing it kept the dependency tree smaller and avoided an unnecessary migration/schema-generation layer for a single-table application.

---
 
The preceding document was generated with the assistance of the following: Claude-Web[Claude Sonnet 5]

 

