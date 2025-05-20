import axios from "axios";

export const getAllTask = (callback) => {
  axios
    .get("http://localhost:9000/api/v1/tasks")
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getTaskById = (id, callback) => {
  axios
    .get(`http://localhost:9000/api/v1/task/${id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.error("Error get task by id:", error);
    });
};

export const getTaskUser = (userId, callback) => {
  axios
    .get(`http://localhost:9000/api/v1/user/${userId}/task`)
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createNewTask = (data, callback) => {
  axios
    .post("http://localhost:9000/api/v1/task", data)
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateTask = (id, data, callback) => {
  axios
    .put(`http://localhost:9000/api/v1/task/${id}`, data)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.error("Error updating data task", error);
    });
};

export const deleteTask = (id, callback) => {
  axios
    .delete(`http://localhost:9000/api/v1/task/${id}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.error("Deleting task data failed", error);
    });
};
