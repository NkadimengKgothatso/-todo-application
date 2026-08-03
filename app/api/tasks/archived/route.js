import { NextResponse } from 'next/server';
import { getArchivedTasks } from '@/lib/tasks.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sortBy = searchParams.get('sortBy');
  const tasks = getArchivedTasks({ sortBy });
  return NextResponse.json(tasks);
}
