'use client';

import { isOverdue } from '@/lib/overdue.js';

const STATUS_ABBR = { 'Todo': 'TD', 'In-Progress': 'IP', 'Complete': 'CM' };
const STATUS_CLASS = { 'Todo': 'status-todo', 'In-Progress': 'status-in-progress', 'Complete': 'status-complete' };

export default function TaskCard({ task, onEdit, onArchive }) {
  const overdue = isOverdue(task);
  const statusClass = STATUS_CLASS[task.status] || '';

  return (
    <div className={`ledger-card ${statusClass} ${overdue ? 'is-overdue' : ''}`}>
      <div className="ledger-card-head">
        <h3 className="ledger-card-title">{task.title}</h3>
        <span className={`ledger-stamp ${overdue ? 'overdue' : ''}`}>
          {overdue ? 'Overdue' : STATUS_ABBR[task.status] || '—'}
        </span>
      </div>

      {task.description && <p className="ledger-card-desc">{task.description}</p>}

      <div className="ledger-card-meta">
        {task.dueDate && <span>DUE {task.dueDate}</span>}
        {task.topic && <span>{task.topic.toUpperCase()}</span>}
        <span>{task.status}</span>
      </div>

      <div className="ledger-card-actions">
        {onEdit && <button onClick={() => onEdit(task)}>Edit</button>}
        {onArchive && <button onClick={() => onArchive(task.id)}>Archive</button>}
      </div>
    </div>
  );
}
