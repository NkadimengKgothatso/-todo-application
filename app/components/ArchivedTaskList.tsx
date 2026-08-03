'use client';

import { useState, useEffect } from 'react';
import TaskCard from './TaskCard';

export default function ArchivedTaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tasks/archived')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading archived tasks...</p>;
  if (tasks.length === 0) return <p>No archived tasks.</p>;

  return tasks.map((task) => <TaskCard key={task.id} task={task} />);
}
