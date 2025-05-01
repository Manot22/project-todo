import { useEffect, useState } from "react";
import CardTask from "../components/Fragments/CardTask";
import { useLogin } from "../hooks/useLogin";
import { getTaskUser } from "../services/task.service";
import TaskModalLayouts from "../components/Layouts/TaskModalLayouts";
import TaskCreateForm from "../components/Fragments/TaskCreateForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { user, loading } = useLogin();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              className="flex max-w-xl flex-col items-start justify-between"
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
              <CardTask.Footer username={item.user.name} />
            </article>
          ))}
        </CardTask>
      ) : (
        <p>Tidak ada Task</p>
      )}

      <TaskModalLayouts
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        titleForm="Form new Task"
      >
        <TaskCreateForm
          onTaskAdded={handleTaskAdded}
          onClose={handleCloseModal}
        />
      </TaskModalLayouts>
    </div>
  );
};
export default Dashboard;
