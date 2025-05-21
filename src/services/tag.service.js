import axios from "axios";

export const getTagById = (tagId, callback) => {
  axios
    .get(`http://localhost:9000/api/v1/tag/${tagId}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log("Error getting data tag by id", error);
    });
};

export const getTagByUserId = (userId, callback) => {
  axios
    .get(`http://localhost:9000/api/v1/user/${userId}/tags`)
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch((error) => {
      console.log("Error get tag by user id", error);
    });
};

export const createTag = (data, callback) => {
  axios
    .post("http://localhost:9000/api/v1/tag", data)
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch((error) => {
      console.log("Error created new tag", error);
    });
};

export const updateTag = (id, data, callback) => {
  axios
    .put(`http://localhost:9000/api/v1/tag/${id}`, data)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log("Error updating tag Data", error);
    });
};

export const deleteTag = (id, callback) => {
  axios
    .delete(`http://localhost:9000/api/v1/tag/${id}`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((error) => {
      console.log("Error deleting data tag", error);
    });
};
