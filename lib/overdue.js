export function isOverdue(task) {
  if (!task.dueDate || task.status === 'Complete') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(task.dueDate);
  return due < today;
}
