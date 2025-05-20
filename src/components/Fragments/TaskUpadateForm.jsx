import { useEffect, useState } from "react";
import { getTaskById, updateTask } from "../../services/task.service";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button";

const TaskUpdateForm = ({ onClose, onTaskUpdated, taskId }) => {
  const [taskById, setTaskById] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: new Date().toISOString(),
  });

  useEffect(() => {
    if (taskId) {
      getTaskById(taskId, (data) => {
        if (data && data.data) {
          const task = data.data;
          setTaskById(task);
          setFormData({
            title: task.title || "",
            description: task.description || "",
            dueDate: task.dueDate?.split("T")[0] || "",
          });
        }
      });
    }
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTask(taskId, formData, (status, data) => {
      if (status) {
        onTaskUpdated?.(data);
        setFormData({
          title: "",
          description: "",
          dueDate: new Date().toISOString(),
        });
        onClose?.();
      }
    });
  };

  if (!taskById) return <div>Loading task...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        titleLabel="Title"
        name="title"
        type="text"
        placeholder="Judul task"
        value={formData.title}
        onChange={handleChange}
      />
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
      <InputForm
        titleLabel="Tenggat Waktu"
        name="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <div className="flex gap-x-2 ">
        <Button
          classname="w-full mr-2 px-4 py-2 text-sm font-medium  bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          classname="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg--800 focus:outline-none"
          type="submit"
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default TaskUpdateForm;
