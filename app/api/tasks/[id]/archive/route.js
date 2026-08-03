import { NextResponse } from 'next/server';
import { getTaskById, archiveTask } from '@/lib/tasks.js';

export async function POST(request, { params }) {
  const { id } = await params;

  const existing = getTaskById(id);
  if (!existing) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  const archived = archiveTask(id);
  return NextResponse.json(archived);
}
