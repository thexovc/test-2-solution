import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  status: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Remove 'tasks' from dependency array to prevent infinite loop
    // Empty array means this effect runs only once on mount
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/tasks");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Handle different response structures
        // If API returns { data: [...] } or just [...]
        setTasks(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tasks");
        setTasks([]); // Reset tasks on error
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array - runs only once on mount

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <div>No tasks found</div>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            {task.title} - {task.status}
          </div>
        ))
      )}
    </div>
  );
}
