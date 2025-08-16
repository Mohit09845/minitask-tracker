import { motion } from "framer-motion";
import { LogOut, ClipboardList } from "lucide-react";
import TaskList from "../components/TaskList";
import { useAuth } from "../context/AuthContext";

const TasksPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 md:px-8 py-6">
      {/* Header */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6"
      >
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <ClipboardList className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              My Tasks
            </h1>
          </div>
          {user && (
            <p className="text-slate-400 mt-1 text-sm md:text-base">
              Welcome, <span className="font-medium text-blue-300">{user.email}</span> 👋
            </p>
          )}
        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 px-5 py-2.5 font-semibold text-white bg-red-600 rounded-xl shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 w-full md:w-auto"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </motion.header>

      {/* Task List */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700"
      >
        <TaskList />
      </motion.main>
    </div>
  );
};

export default TasksPage;
