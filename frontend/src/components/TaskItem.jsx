import { motion } from "framer-motion";
import { CheckCircle, Undo2, Trash2 } from "lucide-react";

const TaskItem = ({ task, onUpdateStatus, onDelete }) => {
  const isDone = task.status === "DONE";

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start justify-between p-4 bg-slate-800 rounded-xl shadow-md border border-slate-700 hover:shadow-lg transition-all duration-200"
    >
      {/* Left Section (status + title + description) */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              isDone
                ? "bg-green-500/20 text-green-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {task.status}
          </span>
          <h3
            className={`text-lg font-semibold ${
              isDone ? "line-through text-slate-500" : "text-white"
            }`}
          >
            {task.title}
          </h3>
        </div>
        {task.description && (
          <p
            className={`mt-1 text-sm ${
              isDone ? "text-slate-600" : "text-slate-400"
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      {/* Right Section (actions) */}
      <div className="flex items-center space-x-2 ml-4">
        {/* Toggle Done/Undo */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onUpdateStatus(task.id, isDone ? "PENDING" : "DONE")}
          className={`p-2 rounded-full transition-colors duration-200 ${
            isDone
              ? "bg-yellow-600 hover:bg-yellow-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
          title={isDone ? "Mark as Pending" : "Mark as Complete"}
        >
          {isDone ? (
            <Undo2 className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
        </motion.button>

        {/* Delete Task */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(task.id)}
          className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
          title="Delete Task"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.li>
  );
};

export default TaskItem;
