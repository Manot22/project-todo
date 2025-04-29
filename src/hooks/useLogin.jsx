import { useEffect, useState } from "react";
import { getUser } from "../services/auth.service";

export const useLogin = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsername(getUser(token));
    } else {
      window.location.href = "/";
    }
    setUsername(getUser(token));
  }, []);

  return username;
};

// getUser(token)
