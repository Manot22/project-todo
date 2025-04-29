import { register } from "../../services/auth.service";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

const RegisterForm = () => {
  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      name: e.target.name.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    register(data, (status, res) => {
      if (status) {
        window.location.href = "/";
      } else {
        console.log(res.error);
      }
    });
  };
  return (
    <form onSubmit={handleRegister} className="space-y-2">
      <InputForm
        titleLable="E-mail"
        name="email"
        type="email"
        placeholder="example@gmail.com"
      />

      <InputForm
        titleLable="Name"
        name="name"
        type="text"
        placeholder="John Doe"
      />

      <InputForm
        titleLable="Password"
        name="password"
        type="password"
        placeholder="*****"
      />

      <InputForm
        titleLable="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="*****"
      />

      <Button type="submit" classname="bg-blue-500 my-2 hover:bg-blue-300">
        Sign in
      </Button>
    </form>
  );
};
export default RegisterForm;
