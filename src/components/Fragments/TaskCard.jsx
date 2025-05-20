const TaskCard = ({ task, onEdit, onDelete, onToggleComplete, formatDate }) => {
  const isOverdue = !task.isCompleted && new Date(task.dueDate) < new Date();

  return (
    <div
      className={`bg-black/50 backdrop-blur-md rounded-lg shadow overflow-hidden transition-all hover:shadow-md ${
        task.isCompleted
          ? "border-l-4 border-green-700"
          : "border-l-4 border-indigo-700"
      }`}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <button
              onClick={onToggleComplete}
              className={`w-5 h-5 rounded-full border flex-shrink-0 ${
                task.isCompleted
                  ? "bg-green-700 border-green-700"
                  : "border-gray-300"
              }`}
            >
              {task.isCompleted && (
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            <h3
              className={`ml-2 text-lg font-medium capitalize ${
                task.isCompleted
                  ? "text-gray-200 line-through"
                  : "text-gray-200"
              }`}
            >
              {task.title}
            </h3>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={onEdit}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <p
          className={`text-sm mb-4 flex-grow capitalize ${
            task.isCompleted ? "text-gray-200" : "text-gray-200"
          }`}
        >
          {task.description || "No description provided"}
        </p>

        <div className="mt-2 flex items-center text-sm">
          <svg
            className="w-4 h-4 mr-1 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span
            className={`
            ${task.isCompleted ? "text-gray-200" : ""}
            ${
              isOverdue && !task.isCompleted
                ? "text-red-600 font-medium"
                : "text-gray-200"
            }`}
          >
            {formatDate(task.dueDate)}
            {isOverdue && !task.isCompleted && " (Overdue)"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
