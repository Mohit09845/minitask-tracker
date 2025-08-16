import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { getTasks, createTask, updateTask, deleteTask } from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks. Please log in again.');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const response = await createTask({ title: newTitle, description: newDescription });
      setTasks([...tasks, response.data]); // Add new task to the list
      setNewTitle('');
      setNewDescription('');
    } catch (err) {
      setError('Failed to create task.');
    }
  };
  
  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await updateTask(id, { status });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  if (loading) {
    return <p className="text-center text-slate-400">Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Create Task Form */}
      <form onSubmit={handleCreateTask} className="mb-8 p-4 bg-slate-800 rounded-lg shadow-md flex flex-col gap-4">
        <h2 className="text-xl font-bold text-white">Add a New Task</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Task Title"
          required
          className="px-3 py-2 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Task Description (Optional)"
          rows="2"
          className="px-3 py-2 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center text-slate-500">You have no tasks yet. Add one above!</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;