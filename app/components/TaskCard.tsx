'use client';

import { isOverdue } from '@/lib/overdue.js';

export default function TaskCard({ task, onEdit, onArchive }) {
  const overdue = isOverdue(task);

  return (
    <div
      style={{
        border: overdue ? '2px solid red' : '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <h3 style={{ margin: 0 }}>{task.title}</h3>
        {overdue && (
          <span style={{ color: 'red', fontWeight: 'bold', fontSize: '0.85rem' }}>
            🔴 Overdue
          </span>
        )}
      </div>

      {task.description && <p>{task.description}</p>}

      <div style={{ fontSize: '0.85rem', color: '#555', display: 'flex', gap: '1rem' }}>
        {task.dueDate && <span>Due: {task.dueDate}</span>}
        {task.topic && <span>Topic: {task.topic}</span>}
        <span>Status: {task.status}</span>
      </div>

      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
        {onEdit && <button onClick={() => onEdit(task)}>Edit</button>}
        {onArchive && <button onClick={() => onArchive(task.id)}>Archive</button>}
      </div>
    </div>
  );
}
