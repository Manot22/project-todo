import { useLogin } from "../hooks/useLogin";

const Dashboard = () => {
  useLogin();
  return <div>Dashboard page</div>;
};
export default Dashboard;
