import { X, Edit, Check } from "lucide-react";

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  formatDate,
  onTagClick,
  tags = [],
}) => {
  const taskTags = task.tagIds
    ? task.tagIds
        .map((tagId) => tags.find((tag) => tag.id === tagId))
        .filter(Boolean)
    : task.tagId
    ? [tags.find((tag) => tag.id === task.tagId)].filter(Boolean)
    : [];

  const getTagColor = (tagId) => {
    const colorClasses = [
      "bg-blue-100 text-blue-800 border-blue-300",
      "bg-green-100 text-green-800 border-green-300",
      "bg-yellow-100 text-yellow-800 border-yellow-300",
      "bg-purple-100 text-purple-800 border-purple-300",
      "bg-pink-100 text-pink-800 border-pink-300",
      "bg-indigo-100 text-indigo-800 border-indigo-300",
      "bg-red-100 text-red-800 border-red-300",
      "bg-orange-100 text-orange-800 border-orange-300",
    ];

    const colorIndex = tagId % colorClasses.length;
    return colorClasses[colorIndex];
  };

  return (
    <div
      className={`bg-white rounded-lg shadow overflow-hidden border-l-4 ${
        task.isCompleted ? "border-green-500" : "border-yellow-500"
      }`}
    >
      {/* Card Header */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={onToggleComplete}
              className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <h3
              className={`ml-2 text-lg font-medium capitalize ${
                task.isCompleted
                  ? "text-gray-500 line-through"
                  : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={onEdit}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-1 text-gray-500 hover:text-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-4 py-2">
        <p
          className={`text-sm capitalize ${
            task.isCompleted ? "text-gray-500" : "text-gray-700"
          }`}
        >
          {task.description || "No description provided"}
        </p>
      </div>

      {/* Tags Section */}
      {taskTags.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {taskTags.map(
              (tag) =>
                tag && (
                  <span
                    key={tag.id}
                    onClick={() => onTagClick && onTagClick(tag.id)}
                    className={`cursor-pointer inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(
                      tag.id
                    )}`}
                  >
                    {tag.name}
                  </span>
                )
            )}
          </div>
        </div>
      )}

      {/* Card Footer */}
      <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
        <span>Due: {task.dueDate ? formatDate(task.dueDate) : "Not set"}</span>
        <span>Priority: {task.priority || "Normal"}</span>
      </div>
    </div>
  );
};

export default TaskCard;
