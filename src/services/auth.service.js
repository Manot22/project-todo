import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const login = (data, callback) => {
  axios
    .post("http://localhost:9000/api/v1/login", data)
    .then((res) => {
      callback(true, res.data.data.token);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const register = (data, callback) => {
  axios
    .post("http://localhost:9000/api/v1/register", data)
    .then((res) => {
      console.log(res);
      callback(true, res);
    })
    .catch((error) => {
      console.log(error);
      callback(false, error);
    });
};

export const getUser = (token) => {
  const decode = jwtDecode(token);
  return decode.user;
};
