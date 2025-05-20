import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { deleteTask, getTaskUser, updateTask } from "../services/task.service";
import { getTagByUserId } from "../services/tag.service";
import HeaderDashboard from "../components/Layouts/HeaderDashboard";
import TaskCard from "../components/Fragments/TaskCard";
import TaskModalLayouts from "../components/Layouts/TaskModalLayouts";
import TaskCreateForm from "../components/Fragments/TaskCreateForm";
import TaskUpdateForm from "../components/Fragments/TaskUpadateForm";
import TagManagement from "../components/Fragments/TagManagement";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeTagFilter, setActiveTagFilter] = useState(null);
  const { user, loading } = useLogin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      getTaskUser(user.id, (success, data) => {
        if (success) {
          setTasks(data);
          setFilteredTasks(data);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.id) {
      getTagByUserId(user.id, (success, data) => {
        if (success) {
          setTags(data);
        }
      });
    }
  }, [user]);

  // Filter tasks when activeTagFilter changes
  useEffect(() => {
    if (activeTagFilter === null) {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(
        (task) =>
          task.tagId === activeTagFilter ||
          (task.tags && task.tags.some((tag) => tag.id === activeTagFilter))
      );
      setFilteredTasks(filtered);
    }
  }, [activeTagFilter, tasks]);

  const handleOpenModal = () => {
    setModalMode("create");
    setEditingTaskId(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenEditModal = (taskId) => {
    setModalMode("edit");
    setEditingTaskId(taskId);
    setIsModalOpen(true);
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prevTask) => [...prevTask, newTask]);
    handleCloseModal();
  };

  const handleTagAdded = (newTag) => {
    setTags((prevTag) => [...prevTag, newTag]);
  };

  const handleTagsUpdate = (updatedTags) => {
    setTags(updatedTags);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId, (success) => {
        if (success) {
          setTasks((prev) => prev.filter((task) => task.id !== taskId));
        }
      });
    }
  };

  const handleToggleComplete = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    const newStatus = !task.isCompleted;

    updateTask(taskId, { isCompleted: newStatus }, (success, updatedTask) => {
      if (success) {
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? updatedTask.data : task))
        );
      }
    });
  };

  const handleClearTagFilter = () => {
    setActiveTagFilter(null);
  };

  const handleSetTagFilter = (tagId) => {
    setActiveTagFilter(tagId);
  };

  const tasksPending = filteredTasks.filter((task) => !task.isCompleted);
  const completedTasks = filteredTasks.filter((task) => task.isCompleted);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderDashboard
        pendingTasks={tasksPending}
        completedTasks={completedTasks}
        handleOpenModal={handleOpenModal}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Tag Management Section */}
          <TagManagement
            tags={tags}
            onAddTag={handleTagAdded}
            onTagsUpdate={handleTagsUpdate}
          />

          {/* Active Tag Filter Indicator */}
          {activeTagFilter && (
            <div className="bg-purple-50 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium text-purple-800">
                  Filtering by tag:{" "}
                  {tags.find((t) => t.id === activeTagFilter)?.name ||
                    "Unknown Tag"}
                </span>
              </div>
              <button
                onClick={handleClearTagFilter}
                className="text-sm text-purple-700 hover:text-purple-900 font-medium"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Pending Tasks Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-6 bg-yellow-500 rounded mr-2"></span>
              Pending Tasks
              {activeTagFilter && (
                <span className="ml-2 text-sm text-gray-500">
                  ({tasksPending.length})
                </span>
              )}
            </h2>
            {tasksPending.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tasksPending.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => handleOpenEditModal(task.id)}
                    onDelete={() => handleDeleteTask(task.id)}
                    onToggleComplete={() => handleToggleComplete(task.id)}
                    formatDate={formatDate}
                    onTagClick={handleSetTagFilter}
                    tags={tags}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">
                  No pending tasks{activeTagFilter ? " with this tag" : ""}
                </p>
              </div>
            )}
          </section>

          {/* Completed Tasks Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-500 rounded mr-2"></span>
              Completed Tasks
              {activeTagFilter && (
                <span className="ml-2 text-sm text-gray-500">
                  ({completedTasks.length})
                </span>
              )}
            </h2>
            {completedTasks.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => handleOpenEditModal(task.id)}
                    onDelete={() => handleDeleteTask(task.id)}
                    onToggleComplete={() => handleToggleComplete(task.id)}
                    formatDate={formatDate}
                    onTagClick={handleSetTagFilter}
                    tags={tags}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">
                  No completed tasks{activeTagFilter ? " with this tag" : ""}
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <TaskModalLayouts
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        titleForm={
          modalMode === "create" ? "Form New Task" : "Form Update Task"
        }
      >
        {modalMode === "create" ? (
          <TaskCreateForm
            onTaskAdded={handleTaskAdded}
            onClose={handleCloseModal}
            availableTags={tags}
          />
        ) : (
          <TaskUpdateForm
            taskId={editingTaskId}
            onClose={handleCloseModal}
            availableTags={tags}
            onTaskUpdated={(updatedTask) => {
              setTasks((prev) =>
                prev.map((task) =>
                  task.id === updatedTask.data.id ? updatedTask.data : task
                )
              );
              handleCloseModal();
            }}
          />
        )}
      </TaskModalLayouts>
    </div>
  );
};

export default Dashboard;
