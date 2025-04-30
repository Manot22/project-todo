import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

export const useLogin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        window.location.href = "/";
        return;
      }
      const { data } = await axiosInstance.get("/profile");
      setUser(data.data);
    } catch (error) {
      console.error("Error get profile user", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    loading,
  };
};
