import { NextResponse } from 'next/server';
import { createTask, getAllTasks } from '@/lib/tasks.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sortBy = searchParams.get('sortBy');
  const tasks = getAllTasks({ sortBy });
  return NextResponse.json(tasks);
}

export async function POST(request) {
  const body = await request.json();

  if (!body.title || body.title.trim() === '') {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const validStatuses = ['Todo', 'In-Progress', 'Complete'];
  const status = body.status || 'Todo';
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const task = createTask({
    title: body.title.trim(),
    description: body.description,
    dueDate: body.dueDate,
    topic: body.topic,
    status,
  });

  return NextResponse.json(task, { status: 201 });
}
