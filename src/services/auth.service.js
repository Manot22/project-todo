import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "../lib/axios";

export const login = async (data, callback) => {
  try {
    const res = await axiosInstance.post("/login", data);

    callback(true, res.data.data.token);
  } catch (error) {
    console.error("Error post data login ", error);
  }
};

export const register = async (data, callback) => {
  try {
    const res = await axiosInstance.post("/register", data);

    callback(true, res.data);
  } catch (error) {
    console.error("Error register data", error);
  }
};

export const getUser = (token) => {
  const decode = jwtDecode(token);
  return decode.user;
};
