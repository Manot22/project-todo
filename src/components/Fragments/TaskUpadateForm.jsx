import { useEffect, useState } from "react";
import { getTaskById, updateTask } from "../../services/task.service";
import Button from "../Elements/Button";

const TaskUpdateForm = ({ taskId, onClose, onTaskUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: new Date().toISOString(),
    priority: "",
    isCompleted: false,
  });

  useEffect(() => {
    if (taskId) {
      getTaskById(taskId, (data) => {
        if (data && data.data) {
          const task = data.data;
          setFormData(task);
          setFormData({
            title: task.title || "",
            description: task.description || "",
            dueDate: task.dueDate?.split("T")[0] || "",
            priority: task.priority || "",
          });
        }
      });
    }
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(taskId, formData, (success, data) => {
      if (success) {
        onTaskUpdated(data);
        onClose();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          value={formData.description || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-700"
        >
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          value={formData.dueDate || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700"
        >
          Priority
        </label>
        <select
          name="priority"
          id="priority"
          value={formData.priority || "Normal"}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-md"
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button
          onClick={onClose}
          classname="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          classname="bg-purple-600 text-white hover:bg-purple-700"
        >
          Update Task
        </Button>
      </div>
    </form>
  );
};

export default TaskUpdateForm;
