import LoginForm from "../components/Fragments/LoginForm";
import AuthLayouts from "../components/Layouts/AuthLayouts";

const HomePage = () => {
  return (
    <AuthLayouts type="login" titleLayout="Login">
      <LoginForm />
    </AuthLayouts>
  );
};
export default HomePage;
