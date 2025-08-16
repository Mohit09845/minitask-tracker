import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const TasksPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Tasks</h1>
          {user && (
            <p className="text-slate-400">Welcome, {user.email}!</p>
          )}
        </div>

        <button
          onClick={logout}
          className="w-full md:w-auto px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </header>
      <main>
        <TaskList />
      </main>
    </div>
  );
};

export default TasksPage;