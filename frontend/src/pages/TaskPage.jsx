import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';

const TasksPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Tasks</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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