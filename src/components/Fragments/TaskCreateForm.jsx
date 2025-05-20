import { useEffect, useState } from "react";
import { createNewTask } from "../../services/task.service";
import { useLogin } from "../../hooks/useLogin";

const TaskCreateForm = ({ onTaskAdded, onClose }) => {
  const { user } = useLogin();

  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    description: "",
    dueDate: new Date().toISOString(),
    isCompleted: false,
  });

  useEffect(() => {
    if (user && user.id) {
      setFormData((prev) => ({
        ...prev,
        userId: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createNewTask(formData, (success, data) => {
      if (success) {
        onTaskAdded?.(data);
        window.location.href = "/dashboard";
        setFormData({
          title: "",
          description: "",
          dueDate: new Date().toISOString(),
          isCompleted: false,
        });
        onClose?.();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Judul Task
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Deskripsi
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tenggat Waktu
        </label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex">
        <button
          type="button"
          onClick={onClose}
          className="w-full mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none"
        >
          Batal
        </button>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};
export default TaskCreateForm;
