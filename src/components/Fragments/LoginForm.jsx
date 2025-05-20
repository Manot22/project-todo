import { useState } from "react";
import { login } from "../../services/auth.service";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

const LoginForm = () => {
  const [loginFailed, setLoginFaild] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    login(formData, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/dashboard";
      } else {
        setLoginFaild(res.response.data.error);
        console.log(res.response.data.error);
      }
    });
  };
  return (
    <form className="space-y-2" onSubmit={handleLogin}>
      {loginFailed && (
        <p className="bg-red-300 text-black capitalize text-center rounded-lg">
          {loginFailed}
        </p>
      )}
      <InputForm
        titleLable="E-mail"
        name="email"
        onChange={handleChange}
        value={formData.email}
        type="email"
        placeholder="Enter your email"
      />
      <InputForm
        titleLable="Password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        type="password"
        placeholder="*****"
      />

      <Button
        type="submit"
        classname="bg-blue-500 my-2 hover:bg-blue-300 w-full text-white"
      >
        Sign in
      </Button>
    </form>
  );
};
export default LoginForm;
