import Database from "better-sqlite3";

const db = new Database("database/todo.db");

db.exec(`
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    dueDate TEXT,
    topic TEXT,
    status TEXT NOT NULL DEFAULT 'Todo',
    archived INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
);
`);

console.log("Database initialized successfully.");

db.close();