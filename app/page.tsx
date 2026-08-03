import Link from 'next/link';
import CreateTaskForm from './components/CreateTaskForm';
import TaskList from './components/TaskList';

export default function Home() {
  return (
    <main className="ledger-page">
      <div className="ledger-masthead">
        <h1 className="ledger-title">The Task Ledger</h1>
        <p className="ledger-subtitle">a running record of coursework, kept honestly</p>
        <nav className="ledger-nav">
          <Link href="/archived">View the archive →</Link>
        </nav>
      </div>

      <CreateTaskForm />

      <p className="ledger-section-label">Open Entries</p>
      <TaskList />
    </main>
  );
}
