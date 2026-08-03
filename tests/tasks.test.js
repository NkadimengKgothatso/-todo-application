import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const TEST_DB_PATH = path.join(process.cwd(), 'tests', 'test-tasks.db');

let db;

function createTask(db, { title, description, dueDate, topic, status }) {
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
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
}

function archiveTask(db, id) {
  db.prepare('UPDATE tasks SET archived = 1, updatedAt = CURRENT_TIMESTAMP WHERE id = ?').run(id);
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
}

function getAllTasks(db, { includeArchived = false } = {}) {
  const query = includeArchived
    ? 'SELECT * FROM tasks'
    : 'SELECT * FROM tasks WHERE archived = 0';
  return db.prepare(query).all();
}

function isOverdue(task) {
  if (!task.dueDate || task.status === 'Complete') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(task.dueDate);
  return due < today;
}

before(() => {
  if (fs.existsSync(TEST_DB_PATH)) fs.unlinkSync(TEST_DB_PATH);
  db = new Database(TEST_DB_PATH);
  const schema = fs.readFileSync(path.join(process.cwd(), 'lib', 'schema.sql'), 'utf-8');
  db.exec(schema);
});

beforeEach(() => {
  db.exec('DELETE FROM tasks');
});

after(() => {
  db.close();
  if (fs.existsSync(TEST_DB_PATH)) fs.unlinkSync(TEST_DB_PATH);
});

test('creating a task stores it in the database', () => {
  const task = createTask(db, { title: 'Write report', topic: 'Work', status: 'Todo' });

  assert.equal(task.title, 'Write report');
  assert.equal(task.topic, 'Work');
  assert.equal(task.archived, 0);

  const all = getAllTasks(db);
  assert.equal(all.length, 1);
  assert.equal(all[0].title, 'Write report');
});

test('archiving a task marks it as archived instead of deleting it', () => {
  const task = createTask(db, { title: 'Old task' });

  archiveTask(db, task.id);

  const activeTasks = getAllTasks(db);
  assert.equal(activeTasks.length, 0, 'archived task should not appear in active list');

  const allTasks = getAllTasks(db, { includeArchived: true });
  assert.equal(allTasks.length, 1, 'archived task should still exist in the database');
  assert.equal(allTasks[0].archived, 1);
});

test('overdue tasks are correctly identified', () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const overdueTask = { dueDate: yesterdayStr, status: 'Todo' };
  const futureTask = { dueDate: tomorrowStr, status: 'Todo' };
  const completedPastTask = { dueDate: yesterdayStr, status: 'Complete' };

  assert.equal(isOverdue(overdueTask), true, 'past due date + not complete = overdue');
  assert.equal(isOverdue(futureTask), false, 'future due date = not overdue');
  assert.equal(isOverdue(completedPastTask), false, 'completed task is never overdue, even if past due date');
});
