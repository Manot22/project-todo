import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { createTag, deleteTag, updateTag } from "../../services/tag.service";
import { PlusCircle, X, Edit, Check } from "lucide-react";

const TagManagement = ({ tags, onAddTag, onTagsUpdate }) => {
  const { user } = useLogin();
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [editingTagId, setEditingTagId] = useState(null);
  const [editName, setEditName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagColors] = useState([
    "bg-blue-100 text-blue-800 border-blue-300",
    "bg-green-100 text-green-800 border-green-300",
    "bg-yellow-100 text-yellow-800 border-yellow-300",
    "bg-purple-100 text-purple-800 border-purple-300",
    "bg-pink-100 text-pink-800 border-pink-300",
    "bg-indigo-100 text-indigo-800 border-indigo-300",
    "bg-red-100 text-red-800 border-red-300",
    "bg-orange-100 text-orange-800 border-orange-300",
  ]);

  useEffect(() => {
    if (user && user.id) {
      setFormData((prev) => ({ ...prev, userId: user.id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, name: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    createTag(formData, (success, data) => {
      if (success) {
        onAddTag(data);
        setFormData((prev) => ({ ...prev, name: "" }));
        setIsCreating(false);
      }
    });
  };

  const handleDeleteTag = (tagId) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      deleteTag(tagId, (success) => {
        if (success) {
          onTagsUpdate(tags.filter((tag) => tag.id !== tagId));
        }
      });
    }
  };

  const handleStartEdit = (tag) => {
    setEditingTagId(tag.id);
    setEditName(tag.name);
  };

  const handleEndEdit = (tagId) => {
    if (!editName.trim()) {
      setEditingTagId(null);
      return;
    }

    // Use the updateTag function to update the tag name
    updateTag(tagId, { name: editName, userId: user.id }, (success) => {
      if (success) {
        const updatedTags = tags.map((tag) =>
          tag.id === tagId ? { ...tag, name: editName } : tag
        );
        onTagsUpdate(updatedTags);
      } else {
        console.error("Failed to update tag");
        // Optionally show an error message to the user
      }
      setEditingTagId(null);
    });
  };

  const toggleTagSelection = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const getTagColor = (tagId) => {
    const colorIndex = tagId % tagColors.length;
    return tagColors[colorIndex];
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <span className="w-2 h-6 bg-purple-500 rounded mr-2"></span>
          Tags
        </h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Tag
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        {isCreating && (
          <div className="flex items-center mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter new tag name"
              autoFocus
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-600 text-white font-medium rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Add
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className={`relative flex items-center rounded-full px-3 py-1 text-sm font-medium border ${getTagColor(
                  tag.id
                )} ${
                  selectedTags.includes(tag.id)
                    ? "ring-2 ring-offset-1 ring-purple-500"
                    : ""
                } transition-all`}
              >
                {editingTagId === tag.id ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-20 bg-transparent border-none focus:outline-none focus:ring-0 px-0 py-0"
                      autoFocus
                    />
                    <button
                      onClick={() => handleEndEdit(tag.id)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-3 h-3 mr-1 rounded-full bg-current opacity-70"></div>
                    <span
                      onClick={() => toggleTagSelection(tag.id)}
                      className="cursor-pointer"
                    >
                      {tag.name}
                    </span>
                    <div className="ml-1 flex items-center space-x-1">
                      <button
                        onClick={() => handleStartEdit(tag)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteTag(tag.id)}
                        className="text-gray-500 hover:text-red-600 focus:outline-none"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center">
            No tags yet. Create tags to better organize your tasks.
          </p>
        )}
      </div>
    </div>
  );
};

export default TagManagement;
