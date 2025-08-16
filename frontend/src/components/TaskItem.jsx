import react from "react";

const TaskItem = ({ task, onUpdateStatus, onDelete }) => {
  const isDone = task.status === 'DONE';

  return (
    <li className="flex items-center justify-between p-4 bg-slate-800 rounded-lg shadow">
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold ${
            isDone ? 'line-through text-slate-500' : 'text-white'
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p
            className={`text-sm ${
              isDone ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-3 ml-4">
        {/* Status Toggle Button */}
        <button
          onClick={() => onUpdateStatus(task.id, isDone ? 'PENDING' : 'DONE')}
          className={`px-3 py-1 text-sm font-semibold rounded-full ${
            isDone
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isDone ? 'Undo' : 'Complete'}
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-full hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;