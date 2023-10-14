import { TaskModel } from "../models/TaskModel";
import { UserModel } from "../models/UserModel";
import { Task } from "@commonTypes/Task";

export const boardController = {
  getTasksByUserId: async (userId: string) => {
    if (userId) {
      return TaskModel.find({ userId });
    }

    return [];
  },
  addTask: async (userId: string, task: Task) => {
    const isUserExist = await UserModel.findOne({ _id: userId });

    if (isUserExist) {
      return await TaskModel.create({ userId, ...task });
    }
  },
  deleteTask: async (taskId: string) => {
    const deletedTask = await TaskModel.deleteOne({ _id: taskId });

    return !!deletedTask;
  },
};
