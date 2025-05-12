import { useEffect, useState } from "react";
import { getTaskById, updateTask } from "../../services/task.service";
import { useParams } from "react-router-dom";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button";

const TaskUpadateForm = (onClose, onTaskUpdated) => {
  const { id } = useParams();
  const [taskById, setTaskById] = useState({});

  useEffect(() => {
    getTaskById(id, (data) => {
      setTaskById(data);
    });
  }, [id]);

  const [formData, setFormData] = useState({
    title: taskById.title,
    description: taskById.description,
    dueDate: taskById.dueDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.prevenDefault();

    updateTask(id, formData, (status, data) => {
      if (status) {
        onTaskUpdated(data);
        setFormData({
          title: "",
          description: "",
          dueDate: "",
        });
        onClose();
      }
    });
  };

  return (
    <form action="" onSubmit={handleSubmit}>
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

      <div className="flex gap-x-2">
        <Button type="button" onClick={onClose}>
          Close
        </Button>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
};
export default TaskUpadateForm;
