import Link from 'next/link';
import ArchivedTaskList from '../components/ArchivedTaskList';

export default function ArchivedPage() {
  return (
    <main className="ledger-page">
      <div className="ledger-masthead">
        <h1 className="ledger-title">The Archive</h1>
        <p className="ledger-subtitle">entries closed, never erased</p>
        <nav className="ledger-nav">
          <Link href="/">← Back to the ledger</Link>
        </nav>
      </div>

      <ArchivedTaskList />
    </main>
  );
}
