import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'tasks.db');

const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let db = global._db;

if (!db) {
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  const schema = fs.readFileSync(
    path.join(process.cwd(), 'lib', 'schema.sql'),
    'utf-8'
  );
  db.exec(schema);

  global._db = db;
}

export default db;
