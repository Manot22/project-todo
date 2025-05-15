import { useEffect, useState } from "react";
import CardTask from "../components/Fragments/CardTask";
import { useLogin } from "../hooks/useLogin";
import { getTaskUser } from "../services/task.service";
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
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {tasks.length > 0 ? (
        <CardTask
          mainTitle="Today"
          buttonName="Add Task"
          onClick={handleOpenModal}
        >
          {tasks.map((item) => (
            <article
              className="flex max-w-xl flex-col items-start justify-between bg-gray-100 p-8 rounded-md"
              key={item.id}
            >
              <CardTask.Header
                dueDate={item.dueDate}
                isCompleted={item.isCompleted}
              />
              <CardTask.Content
                title={item.title}
                description={item.description}
              />
              <CardTask.Footer onClick={() => handleOpenEditModal(item.id)} />
            </article>
          ))}
        </CardTask>
      ) : (
        <div>
          <CardTask
            mainTitle="Today"
            buttonName="Add New Task"
            onClick={handleOpenModal}
          >
            <div>Tidak Ada task</div>
          </CardTask>
        </div>
      )}

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
