import Link from 'next/link';
import CreateTaskForm from './components/CreateTaskForm';
import TaskList from './components/TaskList';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Task Manager</h1>
      <nav style={{ marginBottom: '1rem' }}>
        <Link href="/archived">View Archived Tasks</Link>
      </nav>
      <CreateTaskForm />
      <hr style={{ margin: '2rem 0' }} />
      <TaskList />
    </main>
  );
}
