import { axiosInstance } from "../lib/axios";

export const createTaskTag = async (data, callback) => {
  try {
    const res = await axiosInstance.post("/task-tag");

    callback(true, res.data);
  } catch (error) {
    console.error("Error create taskTag data", error);
  }
};

export const getTaskTags = async (taskId, callback) => {
  try {
    const res = await axiosInstance.get(`/tasks/${taskId}/tags`);

    callback(true, res.data);
  } catch (error) {
    console.error("Error getting data taskTag", error);
  }
};

export const getTagTasks = async (tagId, callback) => {
  try {
    const res = await axiosInstance.get(`/tags/${tagId}/tasks`);

    callback(true, res.data);
  } catch (error) {
    console.error("Error getting data tagTasks", error);
  }
};

export const deleteTagFromTask = async (taskTagId, callback) => {
  try {
    const res = await axiosInstance.delete(`/task-tag/${taskTagId}`);

    callback(true, res.data);
  } catch (error) {
    console.log("Error delete tagFromtask", error);
  }
};

export const deleteAllTaskTags = async (taskId, callback) => {
  try {
    const res = await axiosInstance.delete(`/tasks/${taskId}/tags`);

    callback(true, res.data);
  } catch (error) {
    console.error("Error delete all task tags", error);
  }
};
