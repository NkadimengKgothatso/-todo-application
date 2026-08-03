CREATE TABLE IF NOT EXISTS tasks (
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
