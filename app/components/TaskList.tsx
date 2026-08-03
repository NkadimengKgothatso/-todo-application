'use client';

import { useState, useEffect, useCallback } from 'react';
import TaskCard from './TaskCard';
import EditTaskForm from './EditTaskForm';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const url = sortBy ? `/api/tasks?sortBy=${sortBy}` : '/api/tasks';
    const res = await fetch(url);
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  }, [sortBy]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function handleArchive(id) {
    await fetch(`/api/tasks/${id}/archive`, { method: 'POST' });
    fetchTasks();
  }

  function handleEdit(task) {
    setEditingTask(task);
  }

  function handleEditDone() {
    setEditingTask(null);
    fetchTasks();
  }

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Sort by:{' '}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Default (newest first)</option>
            <option value="topic">Topic</option>
            <option value="status">Status</option>
            <option value="dueDate">Due Date</option>
          </select>
        </label>
      </div>

      {editingTask && (
        <EditTaskForm task={editingTask} onDone={handleEditDone} onCancel={() => setEditingTask(null)} />
      )}

      {tasks.length === 0 ? (
        <p>No active tasks.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={handleEdit} onArchive={handleArchive} />
        ))
      )}
    </div>
  );
}
