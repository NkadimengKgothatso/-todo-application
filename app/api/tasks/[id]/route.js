import { NextResponse } from 'next/server';
import { getTaskById, updateTask } from '@/lib/tasks.js';

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  const existing = getTaskById(id);
  if (!existing) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  if (!body.title || body.title.trim() === '') {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const validStatuses = ['Todo', 'In-Progress', 'Complete'];
  const status = body.status || existing.status;
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const updated = updateTask(id, {
    title: body.title.trim(),
    description: body.description,
    dueDate: body.dueDate,
    topic: body.topic,
    status,
  });

  return NextResponse.json(updated);
}
