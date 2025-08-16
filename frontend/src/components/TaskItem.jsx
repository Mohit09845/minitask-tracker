import React from 'react';

const TaskItem = ({ task, onUpdateStatus, onDelete }) => {
  const isDone = task.status === 'DONE';

  return (
    <li className="flex items-center justify-between p-4 bg-slate-800 rounded-lg shadow">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              isDone
                ? 'bg-green-500/20 text-green-400'
                : 'bg-yellow-500/20 text-yellow-400'
            }`}
          >
            {task.status}
          </span>
          <h3
            className={`text-lg font-semibold ${
              isDone ? 'line-through text-slate-500' : 'text-white'
            }`}
          >
            {task.title}
          </h3>
        </div>
        {task.description && (
          <p
            className={`mt-1 text-sm ${
              isDone ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-3 ml-4">
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