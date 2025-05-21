import { useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { register } from "../../services/auth.service";

const RegisterForm = () => {
  const [registerError, setRegisterError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    register(formData, (status, res) => {
      if (status) {
        window.location.href = "/";
      } else {
        setRegisterError(res.response.data.message);
      }
    });
  };
  return (
    <form onSubmit={handleRegister} className="space-y-2">
      {registerError && (
        <p className="bg-red-300 text-black capitalize text-center rounded-lg">
          {registerError}
        </p>
      )}
      <InputForm
        titleLable="E-mail"
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        placeholder="example@gmail.com"
      />

      <InputForm
        titleLable="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        type="text"
        placeholder="John Doe"
      />

      <InputForm
        titleLable="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        type="password"
        placeholder="*****"
      />

      <InputForm
        titleLable="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        type="password"
        placeholder="*****"
      />

      <Button
        type="submit"
        classname="w-full bg-blue-500 my-2 hover:bg-blue-300 text-white"
      >
        Sign in
      </Button>
    </form>
  );
};
export default RegisterForm;
