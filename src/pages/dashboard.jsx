import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { deleteTask, getTaskUser, updateTask } from "../services/task.service";
import HeaderDashboard from "../components/Layouts/HeaderDashboard";
import TaskCard from "../components/Fragments/TaskCard";
import TaskModalLayouts from "../components/Layouts/TaskModalLayouts";
import TaskCreateForm from "../components/Fragments/TaskCreateForm";
import TaskUpdateForm from "../components/Fragments/TaskUpadateForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { user, loading } = useLogin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      getTaskUser(user.id, (success, data) => {
        if (success) {
          setTasks(data);
        }
      });
    }
  }, [user]);

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

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Apakah kamu yakin ingin menghapus task ini?")) {
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

  const tasksPending = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
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
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-6 bg-yellow-500 rounded mr-2"></span>
              Pending Tasks
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
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">No pending tasks</p>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-500 rounded mr-2"></span>
              Completed Tasks
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
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">No completed tasks</p>
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
          />
        ) : (
          <TaskUpdateForm
            taskId={editingTaskId}
            onClose={handleCloseModal}
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
