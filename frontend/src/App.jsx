import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import TasksPage from './pages/TaskPage';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans">
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/tasks" /> : <AuthPage />} 
        />

        <Route 
          path="/tasks" 
          element={user ? <TasksPage /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/" 
          element={<Navigate to={user ? "/tasks" : "/login"} />} 
        />
      </Routes>
    </div>
  );
};

export default App;