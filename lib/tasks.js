import db from './db.js';

export function createTask({ title, description, dueDate, topic, status }) {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, dueDate, topic, status, archived, createdAt, updatedAt)
    VALUES (@title, @description, @dueDate, @topic, @status, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);

  const result = stmt.run({
    title,
    description: description || null,
    dueDate: dueDate || null,
    topic: topic || null,
    status: status || 'Todo',
  });

  return getTaskById(result.lastInsertRowid);
}

export function getTaskById(id) {
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
}

const VALID_SORT_COLUMNS = ['topic', 'status', 'dueDate'];

export function getAllTasks({ sortBy, includeArchived = false } = {}) {
  let query = 'SELECT * FROM tasks';
  const conditions = [];

  if (!includeArchived) {
    conditions.push('archived = 0');
  }
  if (conditions.length) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  if (sortBy && VALID_SORT_COLUMNS.includes(sortBy)) {
    query += ` ORDER BY ${sortBy} ASC`;
  } else {
    query += ' ORDER BY createdAt DESC';
  }

  return db.prepare(query).all();
}

export function getArchivedTasks({ sortBy } = {}) {
  return getAllTasks({ sortBy, includeArchived: true }).filter(t => t.archived === 1);
}

export function updateTask(id, { title, description, dueDate, topic, status }) {
  const stmt = db.prepare(`
    UPDATE tasks
    SET title = @title,
        description = @description,
        dueDate = @dueDate,
        topic = @topic,
        status = @status,
        updatedAt = CURRENT_TIMESTAMP
    WHERE id = @id
  `);

  stmt.run({
    id,
    title,
    description: description || null,
    dueDate: dueDate || null,
    topic: topic || null,
    status,
  });

  return getTaskById(id);
}

export function archiveTask(id) {
  const stmt = db.prepare(`
    UPDATE tasks SET archived = 1, updatedAt = CURRENT_TIMESTAMP WHERE id = ?
  `);
  stmt.run(id);
  return getTaskById(id);
}
