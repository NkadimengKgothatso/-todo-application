'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTaskForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    topic: '',
    status: 'Todo',
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create task');
      }

      setForm({ title: '', description: '', dueDate: '', topic: '', status: 'Todo' });
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ledger-form">
      <h2>New Entry</h2>
      {error && <p className="ledger-error">{error}</p>}

      <label className="ledger-field">
        Title *
        <input type="text" name="title" value={form.title} onChange={handleChange} required />
      </label>

      <label className="ledger-field">
        Description
        <textarea name="description" value={form.description} onChange={handleChange} />
      </label>

      <label className="ledger-field">
        Due Date
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
      </label>

      <label className="ledger-field">
        Topic
        <input type="text" name="topic" value={form.topic} onChange={handleChange} />
      </label>

      <label className="ledger-field">
        Status
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Todo">Todo</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Complete">Complete</option>
        </select>
      </label>

      <button type="submit" className="ledger-btn" disabled={submitting}>
        {submitting ? 'Recording…' : 'Add to Ledger'}
      </button>
    </form>
  );
}
