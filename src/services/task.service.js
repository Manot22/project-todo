import axios from "axios";

export const getAllTask = (callback) => {
  axios
    .get("http://localhost:9000/api/v1/tasks")
    .then((res) => {
      console.log(res.data.data);
      callback(true, res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getTaskUser = (userId, callback) => {
  axios
    .get(`http://localhost:9000/api/v1/user/${userId}/task`)
    .then((res) => {
      console.log(res.data.data);
      callback(true, res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
