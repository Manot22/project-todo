import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import Button from "../Elements/Button";
import { createTag } from "../../services/tag.service";

const TagCreateForm = ({ onAddTag }) => {
  const { user } = useLogin();
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
  });

  useEffect(() => {
    if (user?.id) {
      setFormData((prev) => ({ ...prev, userId: user.id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    createTag(formData, (success, data) => {
      if (success) {
        onAddTag(data);
        setFormData((prev) => ({
          ...prev,
          name: "",
        }));
      }
    });
  };

  return (
    <div className="w-full flex justify-center items-center py-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 border">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Create New Tag
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Tag Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Urgent, Work, Personal"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <Button
            type="submit"
            classname="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md w-full transition"
          >
            Add Tag
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TagCreateForm;
