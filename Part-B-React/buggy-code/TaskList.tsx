import { useState, useEffect } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [tasks]);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          {task.title} - {task.status}
        </div>
      ))}
    </div>
  );
}
