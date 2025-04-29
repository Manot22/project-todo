import RegisterForm from "../components/Fragments/RegisterForm";
import AuthLayouts from "../components/Layouts/AuthLayouts";

const RegisterPage = () => {
  return (
    <AuthLayouts titleLayout="Register" type="register">
      <RegisterForm />
    </AuthLayouts>
  );
};
export default RegisterPage;
