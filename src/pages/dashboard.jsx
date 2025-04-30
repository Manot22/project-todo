import { useEffect, useState } from "react";
import CardTask from "../components/Fragments/CardTask";
import { useLogin } from "../hooks/useLogin";
import { getTaskUser } from "../services/task.service";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { user, loading } = useLogin();

  useEffect(() => {
    if (user && user.id) {
      getTaskUser(user.id, (success, data) => {
        if (success) {
          setTasks(data);
        }
      });
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {tasks.length > 0 ? (
        <CardTask mainTitle="Today">
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
    </div>
  );
};
export default Dashboard;
